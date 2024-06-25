"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAreasService = void 0;
const response_1 = require("../config/utils/response");
const userAreas_1 = require("../repositories/userAreas");
const response = new response_1.ResponseOn();
const userAreaRepository = new userAreas_1.UserAreasRepository();
class UserAreasService {
    constructor() {
        this.getAll = async (interestAreaId, limit) => {
            try {
                const userAreas = await userAreaRepository.getAll(interestAreaId, limit);
                if (userAreas.length === 0) {
                    return response.error('Nenhum registro encontrado', 404);
                }
                return response.success(userAreas, 200);
            }
            catch (error) {
                return response.error(error.message, 500);
            }
        };
        this.getByUserId = async (userId) => {
            try {
                const userAreas = await userAreaRepository.getByUserId(userId);
                if (userAreas.length === 0) {
                    return response.error('Nenhum registro encontrado para este usuário', 404);
                }
                return response.success(userAreas, 200);
            }
            catch (error) {
                return response.error(error.message, 500);
            }
        };
        this.create = async (createUserAreaDTO) => {
            try {
                const newUserArea = await userAreaRepository.create(createUserAreaDTO);
                return response.success(newUserArea, 201);
            }
            catch (error) {
                return response.error(error.message, 500);
            }
        };
        this.exclude = async (user_id, area_id) => {
            try {
                const result = await userAreaRepository.delete(user_id, area_id);
                if (result.affected === 0) {
                    return response.error('Nenhuma área de interesse encontrada para excluir', 404);
                }
                return response.success(null, 200);
            }
            catch (error) {
                return response.error(error.message, 500);
            }
        };
    }
}
exports.UserAreasService = UserAreasService;
