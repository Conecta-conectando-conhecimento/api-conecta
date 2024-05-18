// src/services/participantView.ts

import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { ParticipantViewEntity } from '../entities/participantView';
import { ParticipantViewRepository } from '../repositories/participantView';

const response = new ResponseOn();
const participantViewRepository = new ParticipantViewRepository();

export class ParticipantViewService {

    getById = async (id: number): Promise<APIResponse<ParticipantViewEntity | string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const participant = await participantViewRepository.getById(id);

            if (!participant) {
                return response.error(`Participante de id ${id} não encontrado`, 404);
            }

            return response.success(participant, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    getByProjectId = async (projectId: number): Promise<APIResponse<ParticipantViewEntity[] | string, ErrorTypes>> => {
        try {
            if (!projectId) {
                return response.error('O id do projeto é obrigatório', 400);
            }

            const participants = await participantViewRepository.getByProjectId(projectId);

            if (participants.length === 0 || !participants) {
                return response.error(`Nenhum participante encontrado para o projeto de id ${projectId}`, 404);
            }

            return response.success(participants, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    getByUserId = async (userId: number): Promise<APIResponse<ParticipantViewEntity[] | string, ErrorTypes>> => {
        try {
            if (!userId) {
                return response.error('O id do usuário é obrigatório', 400);
            }

            const participants = await participantViewRepository.getByUserId(userId);

            if (participants.length === 0 || !participants) {
                return response.error(`Nenhum participante encontrado para o usuário de id ${userId}`, 404);
            }

            return response.success(participants, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };
}
