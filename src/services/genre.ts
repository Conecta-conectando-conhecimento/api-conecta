import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { GenreEntity } from '../entities/genre';
import { GenreRepository } from '../repositories/genre';

const response = new ResponseOn();
const genreRepository = new GenreRepository();

export class GenreService {
    getAll = async (): Promise<APIResponse<GenreEntity[], ErrorTypes>> => {
        try {
            const genres = await genreRepository.getAll();

            if (genres.length === 0 || !genres) {
                return response.error('Nenhum gênero encontrado', 404);
            }

            return response.success(genres, 200);

        } catch (error) {
            return response.error(error, 500);
        }
    };

    getById = async (id: number): Promise<APIResponse<GenreEntity | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const genre = await genreRepository.getById(id);

            if (!genre) {
                return response.error(`Gênero de id ${id} não encontrado`, 404);
            }

            return response.success(genre, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    create = async (name: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!name) {
                return response.error('O nome é obrigatório', 400);
            }

            const checkGenreExist = await genreRepository.getByName(name);

            if (!checkGenreExist) {
                return response.error('O gênero já existe', 400);
            }

            await genreRepository.create({ name });

            return response.success('Gênero foi criado com sucesso', 201);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    update = async (id: number, name: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id || !name) {
                return response.error('O id e o nome são obrigatórios', 400);
            }

            const checkGenreExist = await genreRepository.getById(id);

            if (!checkGenreExist) {
                return response.error(`Gênero de id ${id} não encontrado`, 404);
            }
        
            await genreRepository.update(id, { name });

            return response.success('Gênero foi atualizado com sucesso', 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const checkGenreExist = await genreRepository.getById(id);

            if (!checkGenreExist) {
                response.error(`Gênero de id ${id} não encontrado`, 404);
            }

            await genreRepository.exclude(id);

            return response.success('Gênero foi excluído com sucesso', 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };
}
