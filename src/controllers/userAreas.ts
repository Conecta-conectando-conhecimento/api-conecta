import { UserAreasService } from '../services/userAreas';

const userAreasService = new UserAreasService();

export class UserAreasController {
    async getAll(req, res) {
        const { interestAreaId, limit } = req.query;

        const parsedInterestAreaId = interestAreaId ? parseInt(interestAreaId, 10) : undefined;
        const parsedLimit = limit ? parseInt(limit, 10) : undefined;

        const { codehttp, ...rest } = await userAreasService.getAll(parsedInterestAreaId, parsedLimit);
        return res.status(codehttp).json(rest);
    }
}
