import { AppDataSource } from '../database/connection';
import { UserEntity } from '../entities/user';
import { UserAreasEntity } from '../entities/userAreasEntity';
import { CreateUserDTO, UpdateUserDTO } from '../types/dto';


const userRepository = AppDataSource.getRepository(UserAreasEntity);

export class UserAreasRepository{

    save(){

    }

    create(){
        
    }
}