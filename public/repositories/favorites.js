"use strict";
// src/repositories/favorites.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteRepository = void 0;
const connection_1 = require("../database/connection");
const favorites_1 = require("../entities/favorites");
const favoriteRepository = connection_1.AppDataSource.getRepository(favorites_1.MySavedEntity);
class FavoriteRepository {
    constructor() {
        this.create = async (CreateFavoriteDTO) => {
            await favoriteRepository.insert(CreateFavoriteDTO);
        };
        this.getById = async (id) => {
            return await favoriteRepository.findOneBy({ id });
        };
        this.getFavoritesByUserId = async (userId) => {
            return await favoriteRepository.find({
                where: { user_id: userId },
                relations: ['project'] // Carregar os detalhes do projeto associado
            });
        };
        this.exclude = async (userId, projectId) => {
            await favoriteRepository.delete({ user_id: userId, project_id: projectId });
        };
    }
}
exports.FavoriteRepository = FavoriteRepository;
