"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectFilesRepository = void 0;
const connection_1 = require("../database/connection");
const projectFiles_1 = require("../entities/projectFiles");
const projectFilesRepository = connection_1.AppDataSource.getRepository(projectFiles_1.ProjectFilesEntity);
class ProjectFilesRepository {
    constructor() {
        this.getAll = async (page, limit) => {
            const take = limit || 10;
            const skip = (page && page > 0 ? page - 1 : 0) * take;
            return await projectFilesRepository.find({
                take,
                skip,
                order: {
                    saved_at: 'DESC',
                },
            });
        };
        this.getById = async (id) => {
            return await projectFilesRepository.findOne({ where: { id } });
        };
        this.getByProject = async (project_id) => {
            return await projectFilesRepository.find({ where: { project_id } });
        };
        this.create = async (createProjectFileDTO) => {
            const projectFile = projectFilesRepository.create(createProjectFileDTO);
            await projectFilesRepository.save(projectFile);
        };
        this.update = async (id, updateProjectFileDTO) => {
            await projectFilesRepository.update({ id }, updateProjectFileDTO);
        };
        this.exclude = async (id) => {
            await projectFilesRepository.delete({ id });
        };
    }
}
exports.ProjectFilesRepository = ProjectFilesRepository;
