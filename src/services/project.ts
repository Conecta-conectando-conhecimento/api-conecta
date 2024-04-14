import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { ProjectEntity } from '../entities/project';
import { ProjectRepository } from '../repositories/project';
import { CreateProjectDTO, UpdateProjectDTO } from '../types/dto';

const response = new ResponseOn();
const projectRepository = new ProjectRepository();

export class ProjectService {
    getAll = async (page?: number | string, limit?: number | string): Promise<APIResponse<ProjectEntity[] | string, ErrorTypes>> => {
        try {
            // Converte os parâmetros de string para número, se fornecidos
            const pageNumber = page ? parseInt(page.toString(), 10) : undefined;
            const limitNumber = limit ? parseInt(limit.toString(), 10) : undefined;
    
            const projects = await projectRepository.getAll(pageNumber, limitNumber);
    
            if (projects.length === 0 || !projects) {
                return response.error('Nenhum projeto encontrado', 404);
            }
    
            return response.success(projects, 200);
    
        } catch (error) {
            return response.error(error, 500);
        }
    };

    getById = async (id: number): Promise<APIResponse<ProjectEntity | string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const project = await projectRepository.getById(id);

            if (!project) {
                return response.error(`Projeto de id ${id} não encontrado`, 404);
            }

            return response.success(project, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    getByTitle = async (title: string): Promise<APIResponse<ProjectEntity | String, ErrorTypes>> => {
        try {
            if (!title) {
                return response.error('O titulo é obrigatório', 400);
            }

            const project = await projectRepository.getByTitle(title);

            if (!project) {
                return response.error(`Projeto de titulo ${title} não encontrado`, 404);
            }

            return response.success(project, 200);
        } catch (error) {
            return response.error(error, 500)
        }
    }

    create = async (createProjectDTO: CreateProjectDTO): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            const { title, about, max_participants, interest_area, activities } = createProjectDTO;

            if (!title || !about || !max_participants || !interest_area) {
                return response.error('Os campos título, descrição, número máximo de participantes e área de interesse são obrigatórios', 400);
            }

            await projectRepository.create(createProjectDTO);

            return response.success('Projeto foi criado com sucesso', 201);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    update = async (id: number, updateProjectDTO: UpdateProjectDTO): Promise<APIResponse<string, ErrorTypes>> => {
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
        } catch (error) {
            return response.error(error, 500);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
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
        } catch (error) {
            return response.error(error, 500);
        }
    };
}
