import { AppDataSource } from '../database/connection';
import { ProjectFilesEntity } from '../entities/projectFiles';
import { CreateProjectFileDTO, UpdateProjectFileDTO } from '../types/dto';

const projectFilesRepository = AppDataSource.getRepository(ProjectFilesEntity);

export class ProjectFilesRepository {
    getAll = async (page?: number, limit?: number): Promise<ProjectFilesEntity[]> => {
        const take = limit || 10;
        const skip = (page && page > 0 ? page - 1 : 0) * take;

        return await projectFilesRepository.find({
            take,
            skip,
            order: {
                saved_at: 'DESC',
            },
        });
    };

    getById = async (id: number): Promise<ProjectFilesEntity | undefined> => {
        return await projectFilesRepository.findOne({ where: { id } });
    };

    getByProject = async (project_id: number): Promise<ProjectFilesEntity[] | undefined> => {
        return await projectFilesRepository.find({ where: { project_id } });
    };

    create = async (createProjectFileDTO: CreateProjectFileDTO): Promise<void> => {
        const projectFile = projectFilesRepository.create(createProjectFileDTO);
        await projectFilesRepository.save(projectFile);
    };

    update = async (id: number, updateProjectFileDTO: UpdateProjectFileDTO): Promise<void> => {
        await projectFilesRepository.update({ id }, updateProjectFileDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await projectFilesRepository.delete({ id });
    };
}
