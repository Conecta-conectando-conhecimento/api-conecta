import { UserAreasService } from "../services/userAreas";
import { CreateUserAreaDTO } from '../types/dto';

const userAreasService = new UserAreasService();

export class UserAreasController {
    async getAll(req, res) {
        const { interestAreaId, limit } = req.query;

        const parsedInterestAreaId = interestAreaId ? parseInt(interestAreaId, 10) : undefined;
        const parsedLimit = limit ? parseInt(limit, 10) : undefined;

        const { codehttp, ...rest } = await userAreasService.getAll(parsedInterestAreaId, parsedLimit);
        return res.status(codehttp).json(rest);
    }

    async getByUserId(req, res) {
        const userId = parseInt(req.params.userId, 10);

        const { codehttp, ...rest } = await userAreasService.getByUserId(userId);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const createUserAreaDTO = req.body;
        const { codehttp, ...rest } = await userAreasService.create(createUserAreaDTO);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const user_id = parseInt(req.params.user_id, 10);
        const area_id = parseInt(req.params.area_id, 10);

        const { codehttp, ...rest } = await userAreasService.exclude(user_id, area_id);
        return res.status(codehttp).json(rest);
    }
}
