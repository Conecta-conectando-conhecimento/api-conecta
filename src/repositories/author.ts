import { AppDataSource } from '../database/connection';
import { AuthorEntity } from '../entities/author';
import { CreateAuthorDTO, UpdateAuthorDTO } from '../types/dto';

const authorRepository = AppDataSource.getRepository(AuthorEntity);

export class AuthorRepository {
    getAll = async (page?: number, limit?: number): Promise<AuthorEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await authorRepository.find({
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };

    getById = async (id: number): Promise<AuthorEntity> => {
        return await authorRepository.findOneBy({ id });
    };

    getByName = async (name: string): Promise<AuthorEntity> => {
        return await authorRepository.findOneBy({ name });
    };

    create = async (createAuthorDTO: CreateAuthorDTO): Promise<void> => {
        await authorRepository.insert(createAuthorDTO);
    };

    update = async (id: number, updateAuthorDTO: UpdateAuthorDTO): Promise<void> => {
        await authorRepository.update(id, updateAuthorDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await authorRepository.delete({ id });
    };
}
