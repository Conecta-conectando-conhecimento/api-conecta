"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const response_1 = require("../config/utils/response");
const project_1 = require("../repositories/project");
const response = new response_1.ResponseOn();
const projectRepository = new project_1.ProjectRepository();
class ProjectService {
    constructor() {
        this.getAll = async (page, limit) => {
            try {
                // Converte os parâmetros de string para número, se fornecidos
                const pageNumber = page ? parseInt(page.toString(), 10) : undefined;
                const limitNumber = limit ? parseInt(limit.toString(), 10) : undefined;
                const projects = await projectRepository.getAll(pageNumber, limitNumber);
                if (projects.length === 0 || !projects) {
                    return response.error('Nenhum projeto encontrado', 404);
                }
                return response.success(projects, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.getById = async (id) => {
            try {
                if (!id) {
                    return response.error('O id é obrigatório', 400);
                }
                const project = await projectRepository.getById(id);
                if (!project) {
                    return response.error(`Projeto de id ${id} não encontrado`, 404);
                }
                return response.success(project, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.getByTitle = async (title) => {
            try {
                if (!title) {
                    return response.error('O titulo é obrigatório', 400);
                }
                const project = await projectRepository.getByTitle(title);
                if (!project) {
                    return response.error(`Projeto de titulo ${title} não encontrado`, 404);
                }
                return response.success(project, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.create = async (createProjectDTO) => {
            try {
                const { title, about, max_participants, activities } = createProjectDTO;
                if (!title || !about || !max_participants) {
                    return response.error('Os campos título, descrição, número máximo de participantes e área de interesse são obrigatórios', 400);
                }
                await projectRepository.create(createProjectDTO);
                return response.success('Projeto foi criado com sucesso', 201);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.update = async (id, updateProjectDTO) => {
            try {
                if (!id) {
                    return response.error('O id é obrigatório', 400);
                }
                const projectExist = await projectRepository.getById(id);
                if (!projectExist) {
                    return response.error(`Projeto de id ${id} não encontrado`, 404);
                }
                await projectRepository.update(id, updateProjectDTO);
                return response.success('Projeto foi atualizado com sucesso', 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.exclude = async (id) => {
            try {
                if (!id) {
                    return response.error('O id é obrigatório', 400);
                }
                const projectExist = await projectRepository.getById(id);
                if (!projectExist) {
                    return response.error(`Projeto de id ${id} não encontrado`, 404);
                }
                await projectRepository.exclude(id);
                return response.success('Projeto foi excluído com sucesso', 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
    }
}
exports.ProjectService = ProjectService;
