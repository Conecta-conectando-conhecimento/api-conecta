// src/controllers/favorites.js

import { FavoriteService } from '../services/favorites';

const favoriteService = new FavoriteService();

export class FavoriteController {
    async create(req, res) {
        const createFavoriteDTO = req.body;
        const { codehttp, ...rest } = await favoriteService.create(createFavoriteDTO);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { user_id, project_id } = req.body; // Recebe user_id e project_id no corpo da requisição
        const { codehttp, ...rest } = await favoriteService.exclude(user_id, project_id);
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await favoriteService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async getFavoritesByUserId(req, res) {
        const { userId } = req.params;
        const { codehttp, ...rest } = await favoriteService.getFavoritesByUserId(userId);
        return res.status(codehttp).json(rest);
    }
}
