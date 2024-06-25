"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const response_1 = require("../config/utils/response");
const participants_1 = require("../repositories/participants");
const project_1 = require("../repositories/project");
const response = new response_1.ResponseOn();
const projectRepository = new project_1.ProjectRepository();
const participantRepository = new participants_1.ParticipantRepository();
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
                const { title, introduction, max_participants, user_id } = createProjectDTO;
                // Verificação básica de campos obrigatórios
                if (!title || !introduction || !max_participants || !user_id) {
                    return response.error('Os campos título, descrição, número máximo de participantes e user_id são obrigatórios', 400);
                }
                // Tentar criar o projeto e obter o ID
                const project_id = await projectRepository.create(createProjectDTO);
                if (!project_id) {
                    return response.error('Falha ao criar o projeto. ID do projeto não foi retornado.', 500);
                }
                // Criar o participante associado ao projeto
                const createParticipantDto = {
                    project_id: project_id,
                    user_id: createProjectDTO.user_id,
                    is_admin: true
                };
                await participantRepository.create(createParticipantDto);
                // Retornar o ID do projeto no objeto de resposta
                return response.success("Sucesso ao criar projeto e participante", 201);
            }
            catch (error) {
                console.error('Erro ao criar projeto no serviço:', error);
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
