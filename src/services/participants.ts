import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { ParticipantsEntity } from '../entities/participants';
import { ParticipantRepository } from '../repositories/participants';
import { UserRepository } from '../repositories/user';
import { CreateParticipantDTO, UpdateParticipantDTO } from '../types/dto';

const response = new ResponseOn();
const participantRepository = new ParticipantRepository();

export class ParticipantService {


    getById = async (id: number): Promise<APIResponse<ParticipantsEntity | string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const participant = await participantRepository.getById(id);

            if (!participant) {
                return response.error(`Participante de id ${id} não encontrado`, 404);
            }

            return response.success(participant, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    getByProjectId = async (projectId: number): Promise<APIResponse<ParticipantsEntity[] | string, ErrorTypes>> => {
        try {
            if (!projectId) {
                return response.error('O id do projeto é obrigatório', 400);
            }

            const participants = await participantRepository.getByProjectId(projectId);

            if (participants.length === 0 || !participants) {
                return response.error(`Nenhum participante encontrado para o projeto de id ${projectId}`, 404);
            }

            return response.success(participants, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    getByUserId = async (userId: number): Promise<APIResponse<ParticipantsEntity[] | string, ErrorTypes>> => {
        try {
            if (!userId) {
                return response.error('O id do usuário é obrigatório', 400);
            }

            const participants = await participantRepository.getByUserId(userId);

            if (participants.length === 0 || !participants) {
                return response.error(`Nenhum participante encontrado para o usuário de id ${userId}`, 404);
            }

            return response.success(participants, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    create = async (createParticipantDTO: CreateParticipantDTO): Promise<APIResponse<string, ErrorTypes>> => {
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
                } else {
                    return response.error('Participante já existe', 400);
                }
            } else {
                // Caso contrário, cria um novo participante normalmente
                await participantRepository.create(createParticipantDTO);
                return response.success('Participante foi criado com sucesso', 201);
            }
        } catch (error) {
            return response.error(error, 500);
        }
    };
    

    update = async (id: number, updateParticipantDTO: UpdateParticipantDTO): Promise<APIResponse<string, ErrorTypes>> => {
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
        } catch (error) {
            return response.error(error, 500);
        }
    };

    async exclude(id: number): Promise<APIResponse<string, ErrorTypes>> {
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
        } catch (error) {
            return response.error(error, 500);
        }
    }
}