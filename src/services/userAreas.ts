import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { UserAreasEntity } from '../entities/UserAreas';
import { UserAreasRepository } from '../repositories/UserAreas';

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
}
