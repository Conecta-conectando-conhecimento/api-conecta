import { AppDataSource } from '../database/connection';
import { UserAreasEntity } from '../entities/UserAreas';

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
}
