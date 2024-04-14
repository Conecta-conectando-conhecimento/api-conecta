import { AppDataSource } from '../database/connection';
import { ProjectEntity } from '../entities/project'; 
import { CreateProjectDTO, UpdateProjectDTO } from '../types/dto';

const projectRepository = AppDataSource.getRepository(ProjectEntity);

export class ProjectRepository {
    getAll = async (page?: number, limit?: number): Promise<ProjectEntity[]> => {
        const skipNumber = page ? (page - 1) * (limit || 10) : 0;
        const takeNumber = limit || 10;
    
        return await projectRepository.find({
            skip: skipNumber,
            take: takeNumber,
        });
    };

    getById = async (id: number): Promise<ProjectEntity | undefined> => {
        return await projectRepository.findOne({ where: { id } });
    };

    getByTitle = async (title: string): Promise<ProjectEntity | undefined> => {
        return await projectRepository.findOne({ where: { title } });
    };

    create = async (createProjectDTO: CreateProjectDTO): Promise<void> => {
        await projectRepository.insert(createProjectDTO);
    };

    update = async (id: number, updateProjectDTO: UpdateProjectDTO): Promise<void> => {
        await projectRepository.update({ id }, updateProjectDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await projectRepository.delete({ id });
    };
}
