import { AppDataSource } from '../database/connection';
import { MySavedEntity } from '../entities/favorites';
import { CreateFavoriteDTO } from '../types/dto';


const favoriteRepository = AppDataSource.getRepository(MySavedEntity);

export class FavoriteRepository {
   
    create = async (CreateFavoriteDTO: CreateFavoriteDTO): Promise<void> => {
        await favoriteRepository.insert(CreateFavoriteDTO);
    };

    getById = async (id: number): Promise<MySavedEntity> => {
        return await favoriteRepository.findOneBy({ id });
    };

    exclude = async (id: number): Promise<void> => {
        await favoriteRepository.delete({ id });
    };
}
