import { AppDataSource } from '../database/connection';
import { UserEntity } from '../entities/user';
import { CreateUserDTO, UpdateUserDTO, CreateAreaUserDTO } from '../types/dto';
import { UserAreasEntity } from '../entities/userAreasEntity';

const userRepository = AppDataSource.getRepository(UserEntity);
const userAreasRepository = AppDataSource.getRepository(UserAreasEntity);

export class UserRepository {
    getAll = async (page: number = 1, limit: number = 20): Promise<UserEntity[]> => {
        const skip = (page - 1) * limit;
        return await userRepository.find({
            skip,
            take: limit,
        });
    };

    getById = async (id: number): Promise<UserEntity | null> => {
        return await userRepository.findOneBy({ id });
    };

    getByEmail = async (email: string): Promise<UserEntity | null> => {
        return await userRepository.findOneBy({ email });
    };

    getByCPF = async (cpf: string): Promise<UserEntity | null> => {
        return await userRepository.findOneBy({ cpf });
    };

    private async updateEntity(id: number, updateUserDTO: UpdateUserDTO): Promise<void> {
        await userRepository.update(id, updateUserDTO);
    }

    private async insert(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const user = userRepository.create(createUserDTO);
        return await userRepository.save(user);
    }

    private async insertAreaOfInterest(user_id: number, areaId: number): Promise<void> {
        const userArea = userAreasRepository.create({ user_id: user_id, area_id: areaId });
        await userAreasRepository.save(userArea);
    }

    async create(createUserDTO: CreateUserDTO, areaId: number): Promise<number> {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Inserir o novo usuário
            const user = userRepository.create(createUserDTO);
            const savedUser = await queryRunner.manager.save(user);

            // Inserir a área de interesse
            const userArea = userAreasRepository.create({ user_id: savedUser.id, area_id: areaId });
            await queryRunner.manager.save(userArea);

            // Commitar a transação
            await queryRunner.commitTransaction();
            return savedUser.id;
        } catch (error) {
            // Reverter a transação em caso de erro
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // Liberar a conexão do query runner
            await queryRunner.release();
        }
    }

    update = async (id: number, updateUserDTO: UpdateUserDTO): Promise<void> => {
        await this.updateEntity(id, updateUserDTO);
    };

    updatePassword = async (id: number, password: string): Promise<void> => {
        await userRepository.update(id, { password });
    };

    exclude = async (id: number): Promise<void> => {
        await userRepository.delete({ id });
    };
}
