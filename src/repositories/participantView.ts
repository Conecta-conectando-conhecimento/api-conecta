import { AppDataSource } from '../database/connection';
import { ParticipantViewEntity } from '../entities/participantView';

const participantViewRepository = AppDataSource.getRepository(ParticipantViewEntity);

export class ParticipantViewRepository {

    getById = async (id: number): Promise<ParticipantViewEntity | undefined> => {
        return await participantViewRepository.findOne({ where: { participant_id: id } });
    };

    async getByProjectId(projectId: number): Promise<ParticipantViewEntity[]> {
        return await participantViewRepository.find({ 
            where: { 
                project_id: projectId,
                deleted_at: null
            }
        });
    }

    getByUserId = async (userId: number): Promise<ParticipantViewEntity[]> => {
        return await participantViewRepository.find({ where: { user_id: userId } });
    };
}
