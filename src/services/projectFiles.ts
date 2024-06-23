import { ProjectFilesRepository } from '../repositories/projectFiles';
import { CreateProjectFileDTO, UpdateProjectFileDTO } from '../types/dto';
import supabase from '../config/utils/supabase_cliente';
import path from 'path';
import mime from 'mime-types';


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

    async create(createProjectFileDTO: CreateProjectFileDTO, file: Express.Multer.File) {

       // Obter a extensão do arquivo
    const fileExtension = path.extname(file.originalname);
    // Construir a URL do arquivo com a extensão
    const file_url = `${Date.now()}-${file.originalname}`;
    // Detectar o tipo MIME
    const mimeType = mime.lookup(fileExtension) || 'application/octet-stream';

    try {
        const { data, error } = await supabase.storage
            .from('projectfiles')
            .upload(`files/${file_url}`, file.buffer, {
                cacheControl: '3600',
                upsert: false,
                contentType: mimeType,  // Definindo o tipo MIME correto
            });
        if (error) {
            console.error('Error uploading file to Supabase:', error); 
            throw new Error(`Failed to upload file to Supabase: ${error.message}`);
        }

        createProjectFileDTO.file_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/projectfiles/files/${file_url}`;
        createProjectFileDTO.small_file_url = `/files/${file_url}`;

        await projectFilesRepository.create(createProjectFileDTO);
        return { codehttp: 201, message: 'Project file created successfully', fileUrl: data.path };
    } catch (error) {
        console.error('Error creating project file:', error);

        // Retornando uma mensagem mais específica em caso de falha
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(`Failed to create project file: ${error.response.data.error.message}`);
        } else {
            throw new Error('Unexpected error occurred while creating project file');
        }
    }
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
    
        if (!existingProjectFile) {
            return { codehttp: 404, message: 'Project file not found' };
        }
    
        const filePath = existingProjectFile.small_file_url;
        const newFilePath = filePath.slice(-(filePath.length - 1)); // tirando uma /
    
        console.log(`Tentando deletar o arquivo no caminho: ${newFilePath}`);
    
        const { error: deleteError } = await supabase.storage
            .from('projectfiles')
            .remove([newFilePath]);
    
        if (deleteError) {
            console.error('Erro ao deletar o arquivo do Supabase:', deleteError);
            throw new Error(`Failed to delete file from Supabase: ${deleteError.message}`);
        }
    
        console.log('Arquivo deletado com sucesso do Supabase');
    
        await projectFilesRepository.exclude(id);
        return { codehttp: 200, message: 'Project file deleted successfully' };
    }
    
    
}