import { ProjectFilesRepository } from '../repositories/projectFiles';
import { CreateProjectFileDTO, UpdateProjectFileDTO } from '../types/dto';

const projectFilesRepository = new ProjectFilesRepository();

export class ProjectFilesService {
    async getAll(page?: number, limit?: number) {
        const projectFiles = await projectFilesRepository.getAll(page, limit);
        return { codehttp: 200, projectFiles };
    }

    async getById(id: number) {
        const projectFile = await projectFilesRepository.getById(id);
        if (projectFile) {
            return { codehttp: 200, projectFile };
        } else {
            return { codehttp: 404, message: 'Project file not found' };
        }
    }

    async getByProject(project_id: number) {
        const data = await projectFilesRepository.getByProject(project_id);
        if (data) {
            return { codehttp: 200, data };
        } else {
            return { codehttp: 404, message: 'Project file not found' };
        }
    }

    async create(createProjectFileDTO: CreateProjectFileDTO) {
        await projectFilesRepository.create(createProjectFileDTO);
        return { codehttp: 201, message: 'Project file created successfully' };
    }

    async update(id: number, updateProjectFileDTO: UpdateProjectFileDTO) {
        const existingProjectFile = await projectFilesRepository.getById(id);
        if (existingProjectFile) {
            await projectFilesRepository.update(id, updateProjectFileDTO);
            return { codehttp: 200, message: 'Project file updated successfully' };
        } else {
            return { codehttp: 404, message: 'Project file not found' };
        }
    }

    async exclude(id: number) {
        const existingProjectFile = await projectFilesRepository.getById(id);
        if (existingProjectFile) {
            await projectFilesRepository.exclude(id);
            return { codehttp: 200, message: 'Project file deleted successfully' };
        } else {
            return { codehttp: 404, message: 'Project file not found' };
        }
    }
}