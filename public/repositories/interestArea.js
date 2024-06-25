"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestAreaRepository = void 0;
const connection_1 = require("../database/connection");
const InterestArea_1 = require("../entities/InterestArea");
const interestAreaRepository = connection_1.AppDataSource.getRepository(InterestArea_1.InterestAreaEntity);
class InterestAreaRepository {
    constructor() {
        this.getAll = async () => {
            return await interestAreaRepository.find();
        };
    }
}
exports.InterestAreaRepository = InterestAreaRepository;
