"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantViewController = void 0;
const participantView_1 = require("../services/participantView");
const participantViewService = new participantView_1.ParticipantViewService();
class ParticipantViewController {
    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await participantViewService.getById(id);
        return res.status(codehttp).json(rest);
    }
    async getByProjectId(req, res) {
        const { projectId } = req.params;
        const { codehttp, ...rest } = await participantViewService.getByProjectId(projectId);
        return res.status(codehttp).json(rest);
    }
    async getByUserId(req, res) {
        const { userId } = req.params;
        const { codehttp, ...rest } = await participantViewService.getByUserId(userId);
        return res.status(codehttp).json(rest);
    }
}
exports.ParticipantViewController = ParticipantViewController;
