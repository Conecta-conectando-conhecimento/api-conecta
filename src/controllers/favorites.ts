import { FavoriteService } from '../services/favorites';

const favoriteService = new FavoriteService();

export class FavoriteController {
    async create(req, res) {
        const createProjectDTO = req.body;
        const { codehttp, ...rest } = await favoriteService.create(createProjectDTO);
        return res.status(codehttp).json(rest);
    }

     async exclude(req, res) {
        const { id } = req.params; 
        const { codehttp, ...rest } = await favoriteService.exclude(id);
        return res.status(codehttp).json(rest);
    };

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await favoriteService.getById(id);
        return res.status(codehttp).json(rest);
    }
}
