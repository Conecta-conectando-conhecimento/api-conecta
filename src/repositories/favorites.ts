// src/repositories/favorites.js

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

    getFavoritesByUserId = async (userId: number): Promise<MySavedEntity[]> => {
        console.log(`Fetching favorites for user_id: ${userId}`);
        const favorites = await favoriteRepository.find({
            where: { user_id: userId },
            relations: ['project'] // Carregar os detalhes do projeto associado
        });
        console.log(`Found favorites: ${JSON.stringify(favorites)}`);
        return favorites;
    };

    exclude = async (id: number): Promise<void> => {
        await favoriteRepository.delete({ id });
    };
}
