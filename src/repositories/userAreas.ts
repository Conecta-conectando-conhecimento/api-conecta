import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../database/connection';
import { UserAreasEntity } from '../entities/userAreas';
import { CreateUserAreaDTO } from '../types/dto';

const userAreasRepository = AppDataSource.getRepository(UserAreasEntity);

export class UserAreasRepository {
    getAll = async (interestAreaId?: number, limit?: number): Promise<UserAreasEntity[]> => {
        const takeNumber = limit || 20;

        return await userAreasRepository.find({
            take: takeNumber,
            where: interestAreaId ? {
                area_id: interestAreaId,
            } : {},
        });
    };

    getByUserId = async (userId: number): Promise<UserAreasEntity[]> => {
        return await userAreasRepository.find({
            where: { user_id: userId },
        });
    };

    create = async (createUserAreaDTO: CreateUserAreaDTO): Promise<UserAreasEntity> => {
        const newUserArea = userAreasRepository.create(createUserAreaDTO);
        return await userAreasRepository.save(newUserArea);
    };

    delete = async (user_id: number, area_id: number): Promise<{ affected: number }> => {
        const result = await userAreasRepository.delete({ user_id, area_id } as FindOptionsWhere<UserAreasEntity>);
        return { affected: result.affected || 0 };
    };
}
