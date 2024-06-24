"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantService = void 0;
const response_1 = require("../config/utils/response");
const participants_1 = require("../repositories/participants");
const response = new response_1.ResponseOn();
const participantRepository = new participants_1.ParticipantRepository();
class ParticipantService {
    constructor() {
        this.getById = async (id) => {
            try {
                if (!id) {
                    return response.error('O id é obrigatório', 400);
                }
                const participant = await participantRepository.getById(id);
                if (!participant) {
                    return response.error(`Participante de id ${id} não encontrado`, 404);
                }
                return response.success(participant, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.getByProjectId = async (projectId) => {
            try {
                if (!projectId) {
                    return response.error('O id do projeto é obrigatório', 400);
                }
                const participants = await participantRepository.getByProjectId(projectId);
                if (participants.length === 0 || !participants) {
                    return response.error(`Nenhum participante encontrado para o projeto de id ${projectId}`, 404);
                }
                return response.success(participants, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.getByUserId = async (userId) => {
            try {
                if (!userId) {
                    return response.error('O id do usuário é obrigatório', 400);
                }
                const participants = await participantRepository.getByUserId(userId);
                if (participants.length === 0 || !participants) {
                    return response.error(`Nenhum participante encontrado para o usuário de id ${userId}`, 404);
                }
                return response.success(participants, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.create = async (createParticipantDTO) => {
            try {
                const { project_id, user_id } = createParticipantDTO;
                if (!project_id || !user_id) {
                    return response.error('Os campos id do projeto e id do usuário são obrigatórios', 400);
                }
                const existingParticipant = await participantRepository.getByProjectAndUserId(project_id, user_id);
                if (existingParticipant) {
                    if (existingParticipant.deleted_at) {
                        // Se o participante existe e está marcado como deletado, restaura o participante
                        await participantRepository.restore(existingParticipant.id);
                        return response.success('Participante foi restaurado com sucesso', 200);
                    }
                    else {
                        return response.error('Participante já existe', 400);
                    }
                }
                else {
                    // Caso contrário, cria um novo participante normalmente
                    await participantRepository.create(createParticipantDTO);
                    return response.success('Participante foi criado com sucesso', 201);
                }
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.update = async (id, updateParticipantDTO) => {
            try {
                if (!id) {
                    return response.error('O id é obrigatório', 400);
                }
                const participantExist = await participantRepository.getById(id);
                if (!participantExist) {
                    return response.error(`Participante de id ${id} não encontrado`, 404);
                }
                await participantRepository.update(id, updateParticipantDTO);
                return response.success('Participante foi atualizado com sucesso', 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
    }
    async exclude(id) {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }
            const participantExist = await participantRepository.getById(id);
            if (!participantExist) {
                return response.error(`Participante de id ${id} não encontrado`, 404);
            }
            await participantRepository.exclude(id);
            return response.success('Participante foi excluído com sucesso', 200);
        }
        catch (error) {
            return response.error(error, 500);
        }
    }
}
exports.ParticipantService = ParticipantService;
