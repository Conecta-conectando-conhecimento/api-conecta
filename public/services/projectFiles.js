"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectFilesService = void 0;
const projectFiles_1 = require("../repositories/projectFiles");
const supabase_cliente_1 = __importDefault(require("../config/utils/supabase_cliente"));
const path_1 = __importDefault(require("path"));
const mime_types_1 = __importDefault(require("mime-types"));
const projectFilesRepository = new projectFiles_1.ProjectFilesRepository();
class ProjectFilesService {
    async getAll(page, limit) {
        const projectFiles = await projectFilesRepository.getAll(page, limit);
        return { codehttp: 200, projectFiles };
    }
    async getById(id) {
        const projectFile = await projectFilesRepository.getById(id);
        if (projectFile) {
            return { codehttp: 200, projectFile };
        }
        else {
            return { codehttp: 404, message: 'Project file not found' };
        }
    }
    async getByProject(project_id) {
        const data = await projectFilesRepository.getByProject(project_id);
        if (data) {
            return { codehttp: 200, data };
        }
        else {
            return { codehttp: 404, message: 'Project file not found' };
        }
    }
    async create(createProjectFileDTO, file) {
        // Obter a extensão do arquivo
        const fileExtension = path_1.default.extname(file.originalname);
        // Construir a URL do arquivo com a extensão
        const file_url = `${Date.now()}-${file.originalname}`;
        // Detectar o tipo MIME
        const mimeType = mime_types_1.default.lookup(fileExtension) || 'application/octet-stream';
        try {
            const { data, error } = await supabase_cliente_1.default.storage
                .from('projectfiles')
                .upload(`files/${file_url}`, file.buffer, {
                cacheControl: '3600',
                upsert: false,
                contentType: mimeType, // Definindo o tipo MIME correto
            });
            if (error) {
                console.error('Error uploading file to Supabase:', error);
                throw new Error(`Failed to upload file to Supabase: ${error.message}`);
            }
            createProjectFileDTO.file_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/projectfiles/files/${file_url}`;
            createProjectFileDTO.small_file_url = `/files/${file_url}`;
            await projectFilesRepository.create(createProjectFileDTO);
            return { codehttp: 201, message: 'Project file created successfully', fileUrl: data.path };
        }
        catch (error) {
            console.error('Error creating project file:', error);
            // Retornando uma mensagem mais específica em caso de falha
            if (error.response && error.response.data && error.response.data.error) {
                throw new Error(`Failed to create project file: ${error.response.data.error.message}`);
            }
            else {
                throw new Error('Unexpected error occurred while creating project file');
            }
        }
    }
    async update(id, updateProjectFileDTO) {
        const existingProjectFile = await projectFilesRepository.getById(id);
        if (existingProjectFile) {
            await projectFilesRepository.update(id, updateProjectFileDTO);
            return { codehttp: 200, message: 'Project file updated successfully' };
        }
        else {
            return { codehttp: 404, message: 'Project file not found' };
        }
    }
    async exclude(id) {
        const existingProjectFile = await projectFilesRepository.getById(id);
        if (!existingProjectFile) {
            return { codehttp: 404, message: 'Project file not found' };
        }
        const filePath = existingProjectFile.small_file_url;
        const newFilePath = filePath.slice(-(filePath.length - 1)); // tirando uma /
        console.log(`Tentando deletar o arquivo no caminho: ${newFilePath}`);
        const { error: deleteError } = await supabase_cliente_1.default.storage
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
exports.ProjectFilesService = ProjectFilesService;
