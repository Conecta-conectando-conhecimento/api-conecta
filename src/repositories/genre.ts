import { AppDataSource } from '../database/connection';
import { GenreEntity } from '../entities/genre';
import { CreateGenreDTO, UpdateGenreDTO } from '../types/dto';

const genreRepository = AppDataSource.getRepository(GenreEntity);

export class GenreRepository {
    getAll = async (page?: number, limit?: number): Promise<GenreEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await genreRepository.find({
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };

    getById = async (id: number): Promise<GenreEntity> => {
        return await genreRepository.findOneBy({ id });
    };

    getByName = async (name: string): Promise<GenreEntity> => {
        return await genreRepository.findOneBy({ name });
    };

    create = async (createGenreDTO: CreateGenreDTO): Promise<void> => {
        await genreRepository.insert(createGenreDTO);
    };

    update = async (id: number, updateGenreDTO: UpdateGenreDTO): Promise<void> => {
        await genreRepository.update(id, updateGenreDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await genreRepository.delete({ id });
    };
}
