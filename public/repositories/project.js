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
            try {
                // Cria uma nova instância do projeto
                const newProject = projectRepository.create(createProjectDTO);
                // Salva o projeto no banco de dados
                const savedProject = await projectRepository.save(newProject);
                if (savedProject && savedProject.id) {
                    return savedProject.id;
                }
                else {
                    console.error('Falha ao salvar o projeto. ID não encontrado.');
                    return undefined;
                }
            }
            catch (error) {
                console.error('Erro ao criar projeto:', error);
                throw new Error('Erro ao criar projeto.');
            }
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
