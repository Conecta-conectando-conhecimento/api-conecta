import { AppDataSource } from '../database/connection';
import { InterestAreaEntity } from '../entities/interestArea';

const interestAreaRepository = AppDataSource.getRepository(InterestAreaEntity);

export class InterestAreaRepository {
    getAll = async (): Promise<InterestAreaEntity[]> => {
        return await interestAreaRepository.find();
    };

    getById = async (id: number): Promise<InterestAreaEntity> => {
        return await interestAreaRepository.findOneBy({ id });
    };

    create = async (name: string): Promise<InterestAreaEntity> => {
        const interestArea = interestAreaRepository.create({ name });
        return await interestAreaRepository.save(interestArea);
    };

    update = async (id: number, name: string): Promise<void> => {
        await interestAreaRepository.update(id, { name });
    };

    delete = async (id: number): Promise<void> => {
        await interestAreaRepository.delete({ id });
    };
}
