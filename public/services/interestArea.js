"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestAreaService = void 0;
const response_1 = require("../config/utils/response");
const interestArea_1 = require("../repositories/interestArea");
const response = new response_1.ResponseOn();
const interestAreaRepository = new interestArea_1.InterestAreaRepository();
class InterestAreaService {
    constructor() {
        this.getAll = async () => {
            try {
                const interestAreas = await interestAreaRepository.getAll();
                if (interestAreas.length === 0 || !interestAreas) {
                    return response.error('Nenhuma área de interesse encontrada encontrado', 404);
                }
                return response.success(interestAreas, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
    }
}
exports.InterestAreaService = InterestAreaService;
