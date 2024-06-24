import { InterestAreaService } from '../services/interestArea';

const interestAreaService = new InterestAreaService();

export class InterestAreaController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await interestAreaService.getAll();
        return res.status(codehttp).json(rest);
    }
}
