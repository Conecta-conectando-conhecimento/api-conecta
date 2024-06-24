"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantViewRepository = void 0;
const connection_1 = require("../database/connection");
const participantView_1 = require("../entities/participantView");
const participantViewRepository = connection_1.AppDataSource.getRepository(participantView_1.ParticipantViewEntity);
class ParticipantViewRepository {
    constructor() {
        this.getById = async (id) => {
            return await participantViewRepository.findOne({ where: { participant_id: id } });
        };
        this.getByUserId = async (userId) => {
            return await participantViewRepository.find({ where: { user_id: userId } });
        };
    }
    async getByProjectId(projectId) {
        return await participantViewRepository.find({
            where: {
                project_id: projectId,
                deleted_at: null
            }
        });
    }
}
exports.ParticipantViewRepository = ParticipantViewRepository;
