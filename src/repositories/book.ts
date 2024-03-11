import { AppDataSource } from '../database/connection';
import { BookEntity } from '../entities/book';
import { CreateBookDTO, UpdateBookDTO } from '../types/dto';

const bookRepository = AppDataSource.getRepository(BookEntity);

export class BookRepository {
    getAll = async (page?: number, limit?: number): Promise<BookEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await bookRepository.find({
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };

    getById = async (id: number): Promise<BookEntity> => {
        return await bookRepository.findOneBy({ id });
    };

    getByTitle = async (title: string): Promise<BookEntity> => {
        return await bookRepository.findOneBy({ title });
    };

    create = async (createBookDTO: CreateBookDTO): Promise<void> => {
        await bookRepository.insert(createBookDTO);
    };

    update = async (id: number, updateBookDTO: UpdateBookDTO): Promise<void> => {
        await bookRepository.update(id, updateBookDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await bookRepository.delete({ id });
    };
}
