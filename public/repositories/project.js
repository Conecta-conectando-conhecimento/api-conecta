"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const connection_1 = require("../database/connection");
const project_1 = require("../entities/project");
const projectRepository = connection_1.AppDataSource.getRepository(project_1.ProjectEntity);
class ProjectRepository {
    constructor() {
        this.getAll = async (page, limit) => {
            const skipNumber = page ? (page - 1) * (limit || 10) : 0;
            const takeNumber = limit || 10;
            return await projectRepository.find({
                skip: skipNumber,
                take: takeNumber,
            });
        };
        this.getById = async (id) => {
            return await projectRepository.findOne({ where: { id } });
        };
        this.getByTitle = async (title) => {
            return await projectRepository.findOne({ where: { title } });
        };
        this.create = async (createProjectDTO) => {
            await projectRepository.insert(createProjectDTO);
        };
        this.update = async (id, updateProjectDTO) => {
            await projectRepository.update({ id }, updateProjectDTO);
        };
        this.exclude = async (id) => {
            await projectRepository.delete({ id });
        };
    }
}
exports.ProjectRepository = ProjectRepository;
