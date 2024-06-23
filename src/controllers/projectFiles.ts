import { ProjectFilesService } from '../services/projectFiles';
import upload from '../config/utils/multer_config';
import supabase from '../config/utils/supabase_cliente';

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
        upload.single('file')(req, res, async function (err) {
            if (err) {
                console.error('Error uploading file to Supabase:', err); 
                return res.status(400).json({ message: 'Error uploading file to Supabase', error: err.message });
            }

            const createProjectFileDTO = req.body;
            const file = req.file;

            try {
                const { codehttp, ...rest } = await projectFilesService.create(createProjectFileDTO, file);
                return res.status(codehttp).json(rest);
            } catch (error) {
                console.error('Error creating project file:', error); // Adicionando um log detalhado do erro
                return res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });
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
    
        try {
            const { codehttp, ...rest } = await projectFilesService.exclude(id);
            return res.status(codehttp).json(rest);
        } catch (error) {
            console.error('Error deleting project file:', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
    
    
}
