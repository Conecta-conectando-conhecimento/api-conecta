import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { InterestAreaEntity } from '../entities/InterestArea';
import { InterestAreaRepository} from '../repositories/interestArea';

const response = new ResponseOn();
const interestAreaRepository = new InterestAreaRepository();

export class InterestAreaService {
    getAll = async (): Promise<APIResponse<InterestAreaEntity[], ErrorTypes>> => {
        try {
            const interestAreas = await interestAreaRepository.getAll();

            if (interestAreas.length === 0 || !interestAreas) {
                return response.error('Nenhuma área de interesse encontrada encontrado', 404);
            }

            return response.success(interestAreas, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };
}
