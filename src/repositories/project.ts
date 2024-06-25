import { Repository } from 'typeorm';
import { AppDataSource } from '../database/connection';
import { ProjectEntity } from '../entities/project';
import { CreateParticipantDTO, CreateProjectDTO, UpdateProjectDTO } from '../types/dto';
import { ParticipantRepository } from '../repositories/participants';

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


    create = async (createProjectDTO: CreateProjectDTO): Promise<number | undefined> => {
        try {
            // Cria uma nova instância do projeto
            const newProject = projectRepository.create(createProjectDTO);
    
            // Salva o projeto no banco de dados
            const savedProject = await projectRepository.save(newProject);
    
            if (savedProject && savedProject.id) {
                return savedProject.id;
            } else {
                console.error('Falha ao salvar o projeto. ID não encontrado.');
                return undefined;
            }
        } catch (error) {
            console.error('Erro ao criar projeto:', error);
            throw new Error('Erro ao criar projeto.');
        }
    };
    


    update = async (id: number, updateProjectDTO: UpdateProjectDTO): Promise<void> => {
        await projectRepository.update({ id }, updateProjectDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await projectRepository.delete({ id });
    };
}
