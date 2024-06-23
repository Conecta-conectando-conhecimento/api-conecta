import { AppDataSource } from '../database/connection';
import { ParticipantsEntity } from '../entities/participants';
import { CreateParticipantDTO, UpdateParticipantDTO } from '../types/dto';

const participantRepository = AppDataSource.getRepository(ParticipantsEntity);

export class ParticipantRepository {

    getById = async (id: number): Promise<ParticipantsEntity | undefined> => {
        return await participantRepository.findOne({ where: { id } });
    };

    getByProjectId = async (projectId: number): Promise<ParticipantsEntity[]> => {
        return await participantRepository.find({ where: { project_id: projectId } });
    };

    getByUserId = async (userId: number): Promise<ParticipantsEntity[]> => {
        return await participantRepository.find({ where: { user_id: userId } });
    };

    getByProjectAndUserId = async (projectId: number, userId: number): Promise<ParticipantsEntity | null> => {
        const participant = await participantRepository.findOne({ where: { project_id: projectId, user_id: userId } });
        return participant || null;
    };

    restore = async (participantId: number): Promise<void> => {
        await participantRepository.update(participantId, { deleted_at: null });
    };

    create = async (createParticipantDTO: CreateParticipantDTO): Promise<void> => {
        await participantRepository.insert(createParticipantDTO);
    };

    update = async (id: number, updateParticipantDTO: UpdateParticipantDTO): Promise<void> => {
        await participantRepository.update({ id }, updateParticipantDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await participantRepository.update(id, { deleted_at: new Date() });
    }
}