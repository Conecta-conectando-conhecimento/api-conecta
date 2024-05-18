import { ParticipantViewService } from '../services/participantView';

const participantViewService = new ParticipantViewService();

export class ParticipantViewController {

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
