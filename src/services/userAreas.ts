import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { UserAreasEntity } from '../entities/userAreas';
import { UserAreasRepository } from '../repositories/userAreas';
import { CreateUserAreaDTO } from '../types/dto';

const response = new ResponseOn();
const userAreaRepository = new UserAreasRepository();

export class UserAreasService {
    getAll = async (interestAreaId?: number, limit?: number): Promise<APIResponse<UserAreasEntity[], ErrorTypes>> => {
        try {
            const userAreas = await userAreaRepository.getAll(interestAreaId, limit);

            if (userAreas.length === 0) {
                return response.error('Nenhum registro encontrado', 404);
            }

            return response.success(userAreas, 200);
        } catch (error) {
            return response.error(error.message, 500);
        }
    };

    getByUserId = async (userId: number): Promise<APIResponse<UserAreasEntity[], ErrorTypes>> => {
        try {
            const userAreas = await userAreaRepository.getByUserId(userId);

            if (userAreas.length === 0) {
                return response.error('Nenhum registro encontrado para este usuário', 404);
            }

            return response.success(userAreas, 200);
        } catch (error) {
            return response.error(error.message, 500);
        }
    };

    create = async (createUserAreaDTO: CreateUserAreaDTO): Promise<APIResponse<UserAreasEntity, ErrorTypes>> => {
        try {
            const newUserArea = await userAreaRepository.create(createUserAreaDTO);

            return response.success(newUserArea, 201);
        } catch (error) {
            return response.error(error.message, 500);
        }
    };

    exclude = async (user_id: number, area_id: number): Promise<APIResponse<null, ErrorTypes>> => {
        try {
            const result = await userAreaRepository.delete(user_id, area_id);

            if (result.affected === 0) {
                return response.error('Nenhuma área de interesse encontrada para excluir', 404);
            }

            return response.success(null, 200);
        } catch (error) {
            return response.error(error.message, 500);
        }
    };
}
