"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAreasRepository = void 0;
const connection_1 = require("../database/connection");
const userAreas_1 = require("../entities/userAreas");
const userAreasRepository = connection_1.AppDataSource.getRepository(userAreas_1.UserAreasEntity);
class UserAreasRepository {
    constructor() {
        this.getAll = async (interestAreaId, limit) => {
            const takeNumber = limit || 20;
            return await userAreasRepository.find({
                take: takeNumber,
                where: interestAreaId ? {
                    area_id: interestAreaId,
                } : {},
            });
        };
        this.getByUserId = async (userId) => {
            return await userAreasRepository.find({
                where: { user_id: userId },
            });
        };
        this.create = async (createUserAreaDTO) => {
            const newUserArea = userAreasRepository.create(createUserAreaDTO);
            return await userAreasRepository.save(newUserArea);
        };
        this.delete = async (user_id, area_id) => {
            const result = await userAreasRepository.delete({ user_id, area_id });
            return { affected: result.affected || 0 };
        };
    }
}
exports.UserAreasRepository = UserAreasRepository;
