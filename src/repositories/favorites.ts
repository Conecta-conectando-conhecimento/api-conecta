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
        return await favoriteRepository.find({
            where: { user_id: userId },
            relations: ['project'] // Carregar os detalhes do projeto associado
        });
    };

    exclude = async (userId: number, projectId: number): Promise<void> => {
        await favoriteRepository.delete({ user_id: userId, project_id: projectId });
    };
}
