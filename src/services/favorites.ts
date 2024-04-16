import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { MySavedEntity } from '../entities/favorites';
import { FavoriteRepository } from '../repositories/favorites';
import { CreateFavoriteDTO } from '../types/dto';

const response = new ResponseOn();
const favoriteRepository = new FavoriteRepository();

export class FavoriteService {
    
    create = async (CreateFavoriteDTO: CreateFavoriteDTO): Promise<APIResponse<string | null, ErrorTypes>> => {
        try {
            await favoriteRepository.create(CreateFavoriteDTO);
            return response.success('Projeto favoritado com sucesso', 201);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    getById = async (id: number): Promise<APIResponse<MySavedEntity[], ErrorTypes>> => {
        try {
            const favorite = await favoriteRepository.getById(id);
            return response.success([favorite], 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string | null, ErrorTypes>> => {
        try { await favoriteRepository.exclude(id);
            return response.success('Projeto removido dos favoritos com sucesso', 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

}
