import { ProjectService } from '../services/project';

const projectService = new ProjectService();

export class ProjectController {
    async getAll(req, res) {
        const { page, limit } = req.query; // Extrai os parâmetros de query da requisição
        const { codehttp, ...rest } = await projectService.getAll(page, limit); // Passa os parâmetros para a função getAll
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await projectService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async getByTitle(req, res) {
        const { title } = req.params;
        const { codehttp, ...rest } = await projectService.getByTitle(title);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const createProjectDTO = req.body;
        const { codehttp, ...rest } = await projectService.create(createProjectDTO);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const updateProjectDTO = req.body;
        const { codehttp, ...rest } = await projectService.update(id, updateProjectDTO);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await projectService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}
