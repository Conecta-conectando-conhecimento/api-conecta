import { AppDataSource } from '../database/connection';
import { UserAreasEntity } from '../entities/userAreasEntity';
import { CreateAreaUserDTO } from '../types/dto';

const userAreasRepository = AppDataSource.getRepository(UserAreasEntity);

export class UserAreasRepository {
    async create(createAreaUserDTO: CreateAreaUserDTO): Promise<UserAreasEntity> {
        const userArea = userAreasRepository.create(createAreaUserDTO);
        return await userAreasRepository.save(userArea);
    }

    async save(userAreas: UserAreasEntity[]): Promise<UserAreasEntity[]> {
        return await userAreasRepository.save(userAreas);
    }
}
