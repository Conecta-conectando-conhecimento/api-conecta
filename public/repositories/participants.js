"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantRepository = void 0;
const connection_1 = require("../database/connection");
const participants_1 = require("../entities/participants");
const participantRepository = connection_1.AppDataSource.getRepository(participants_1.ParticipantsEntity);
class ParticipantRepository {
    constructor() {
        this.getById = async (id) => {
            return await participantRepository.findOne({ where: { id } });
        };
        this.getByProjectId = async (projectId) => {
            return await participantRepository.find({ where: { project_id: projectId } });
        };
        this.getByUserId = async (userId) => {
            return await participantRepository.find({ where: { user_id: userId } });
        };
        this.getByProjectAndUserId = async (projectId, userId) => {
            const participant = await participantRepository.findOne({ where: { project_id: projectId, user_id: userId } });
            return participant || null;
        };
        this.restore = async (participantId) => {
            await participantRepository.update(participantId, { deleted_at: null });
        };
        this.create = async (createParticipantDTO) => {
            try {
                await participantRepository.insert(createParticipantDTO);
            }
            catch (error) {
                console.error('Erro ao criar participante:', error);
                throw new Error('Erro ao criar participante.');
            }
        };
        this.update = async (id, updateParticipantDTO) => {
            await participantRepository.update({ id }, updateParticipantDTO);
        };
        this.exclude = async (id) => {
            await participantRepository.update(id, { deleted_at: new Date() });
        };
    }
}
exports.ParticipantRepository = ParticipantRepository;
