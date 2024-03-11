import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { AuthorEntity } from '../entities/author';
import { AuthorRepository } from '../repositories/author';

const response = new ResponseOn();
const authorRepository = new AuthorRepository();

export class AuthorService {
    getAll = async (): Promise<APIResponse<AuthorEntity[] | string, ErrorTypes>> => {
        try {
            const authors = await authorRepository.getAll();

            if (authors.length === 0 || !authors) {
                return response.error('Nenhum autor encontrado', 404);
            }

            return response.success(authors, 200);

        } catch (error) {
            return response.error(error, 500);
        }
    };

    getById = async (id: number): Promise<APIResponse<AuthorEntity | string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const author = await authorRepository.getById(id);

            if (!author) {
                return response.error(`Autor de id ${id} não encontrado`, 404);
            }

            return response.success(author, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    create = async (name: string, description: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!name || !description) {
                return response.error('O nome e a descrição são obrigatórios', 400);
            }

            const checkAuthorExist = await authorRepository.getByName(name);

            if (!checkAuthorExist) {
                return response.error('O autor já existe', 400);
            }

            await authorRepository.create({ name, description });

            return response.success('Autor foi criado com sucesso', 201);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    update = async (id: number, name: string, description: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id || !name || !description) {
                return response.error('O id, o nome e a descrição são obrigatórios', 400);
            }

            const checkAuthorExist = await authorRepository.getById(id);

            if (!checkAuthorExist) {
                return response.error(`Autor de id ${id} não encontrado`, 404);
            }
        
            await authorRepository.update(id, { name, description });

            return response.success('Autor foi atualizado com sucesso', 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const checkAuthorExist = await authorRepository.getById(id);

            if (!checkAuthorExist) {
                response.error(`Autor de id ${id} não encontrado`, 404);
            }

            await authorRepository.exclude(id);

            return response.success('Autor foi excluído com sucesso', 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };
}