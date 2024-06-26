import { AppDataSource } from '../database/connection';
import { UserEntity } from '../entities/user';
import { CreateUserDTO, UpdateUserDTO } from '../types/dto';
import { ILike } from 'typeorm';

const userRepository = AppDataSource.getRepository(UserEntity);

export class UserRepository {
    getAll = async (page?: number, limit?: number): Promise<UserEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await userRepository.find({
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };


    // repository
    // repository
    getByName = async (name: string): Promise<UserEntity[]> => {
        const users = await userRepository.find({
            where: {
                name: ILike(`%${name}%`)
            }
        });

        return users;
    };




    getById = async (id: number): Promise<UserEntity> => {
        return await userRepository.findOneBy({ id });
    };

    getByEmail = async (email: string): Promise<UserEntity> => {
        return await userRepository.findOneBy({ email });
    };

    getByCPF = async (cpf: string): Promise<UserEntity> => {
        return await userRepository.findOneBy({ cpf });
    }

    create = async (createUserDTO: CreateUserDTO): Promise<void> => {
        await userRepository.insert(createUserDTO);
    };

    update = async (id: number, updateUserDTO: UpdateUserDTO): Promise<void> => {
        await userRepository.update(id, updateUserDTO);
    };

    updatePassword = async (id: number, password: string): Promise<void> => {
        await userRepository.update(id, { password });
    };

    exclude = async (id: number): Promise<void> => {
        await userRepository.delete({ id });
    };
}
