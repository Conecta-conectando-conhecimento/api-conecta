"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestAreaController = void 0;
const interestArea_1 = require("../services/interestArea");
const interestAreaService = new interestArea_1.InterestAreaService();
class InterestAreaController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await interestAreaService.getAll();
        return res.status(codehttp).json(rest);
    }
}
exports.InterestAreaController = InterestAreaController;
