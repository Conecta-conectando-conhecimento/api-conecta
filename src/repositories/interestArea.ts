import { AppDataSource } from '../database/connection';
import { InterestAreaEntity } from '../entities/InterestArea';

const interestAreaRepository = AppDataSource.getRepository(InterestAreaEntity);

export class InterestAreaRepository {
    getAll = async (): Promise<InterestAreaEntity[]> => {
        return await interestAreaRepository.find();
    };
}