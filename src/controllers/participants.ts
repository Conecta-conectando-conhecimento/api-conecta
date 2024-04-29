import { ParticipantService } from '../services/participants';

const participantService = new ParticipantService();

export class ParticipantController {

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp,...rest } = await participantService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async getByProjectId(req, res) {
        const { projectId } = req.params;
        const { codehttp,...rest } = await participantService.getByProjectId(projectId);
        return res.status(codehttp).json(rest);
    }

    async getByUserId(req, res) {
        const { userId } = req.params;
        const { codehttp,...rest } = await participantService.getByUserId(userId);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const createParticipantDTO = req.body;
        const { codehttp,...rest } = await participantService.create(createParticipantDTO);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const updateParticipantDTO = req.body;
        const { codehttp,...rest } = await participantService.update(id, updateParticipantDTO);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp,...rest } = await participantService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}