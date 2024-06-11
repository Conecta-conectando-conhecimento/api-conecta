import { ProjectFilesService } from '../services/projectFiles';

const projectFilesService = new ProjectFilesService();

export class ProjectFilesController {
    async getAll(req, res) {
        const page = parseInt(req.query.page, 10);
        const limit = parseInt(req.query.limit, 10);

        if (isNaN(page) || isNaN(limit)) {
            return res.status(400).json({ message: 'Invalid page or limit' });
        }

        const { codehttp, ...rest } = await projectFilesService.getAll(page, limit);
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const { codehttp, ...rest } = await projectFilesService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async getByProject(req, res) {
        const { project_id } = req.params;
        const projectId = parseInt(project_id, 10);

        if (isNaN(projectId)) {
            return res.status(400).json({ message: 'Invalid Project ID' });
        }

        const { codehttp, ...rest } = await projectFilesService.getByProject(projectId);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const createProjectFileDTO = req.body;

        const { codehttp, ...rest } = await projectFilesService.create(createProjectFileDTO);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const id = parseInt(req.params.id, 10);
        const updateProjectFileDTO = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const { codehttp, ...rest } = await projectFilesService.update(id, updateProjectFileDTO);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const { codehttp, ...rest } = await projectFilesService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}
