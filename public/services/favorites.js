"use strict";
// src/services/favorites.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const response_1 = require("../config/utils/response");
const favorites_1 = require("../repositories/favorites");
const response = new response_1.ResponseOn();
const favoriteRepository = new favorites_1.FavoriteRepository();
class FavoriteService {
    constructor() {
        this.create = async (CreateFavoriteDTO) => {
            try {
                await favoriteRepository.create(CreateFavoriteDTO);
                return response.success('Projeto favoritado com sucesso', 201);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.getById = async (id) => {
            try {
                const favorite = await favoriteRepository.getById(id);
                return response.success([favorite], 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.getFavoritesByUserId = async (userId) => {
            try {
                const favorites = await favoriteRepository.getFavoritesByUserId(userId);
                return response.success(favorites, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.exclude = async (userId, projectId) => {
            try {
                await favoriteRepository.exclude(userId, projectId);
                return response.success('Projeto removido dos favoritos com sucesso', 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
    }
}
exports.FavoriteService = FavoriteService;
