import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { UserEntity } from '../entities/user';
import { UserRepository } from '../repositories/user';

const response = new ResponseOn();
const userRepository = new UserRepository();

export class UserService {
    getAll = async (): Promise<APIResponse<UserEntity[], ErrorTypes>> => {
        try {
            const users = await userRepository.getAll();

            if (users.length === 0 || !users) {
                return response.error('Nenhum usuário encontrado', 404);
            }

            return response.success(users, 200);

        } catch (error) {
            return response.error(error, 500);
        }
    };

    getById = async (id: number): Promise<APIResponse<UserEntity | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const user = await userRepository.getById(id);

            if (!user) {
                return response.error(`Usuário de id ${id} não encontrado`, 404);
            }

            return response.success(user, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    getByEmail = async (email: string): Promise<APIResponse<UserEntity | null, ErrorTypes>> => {
        try {
            if (!email) {
                return response.error('O email é obrigatório', 400);
            }

            const user = await userRepository.getByEmail(email);

            if (!user) {
                return response.error(`Usuário de email ${email} não encontrado`, 404);
            }

            return response.success(user, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };



    update = async (id: number, email?: string, name?: string, name_user?: string, birthday?: Date): Promise<APIResponse<string | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id do usuário é obrigatório', 400);
            }

            const checkUserExist = await userRepository.getById(id);

            if (!checkUserExist) {
                return response.error(`Usuário de id ${id} não encontrado`, 404);
            }
        
            await userRepository.update(id, { email , name, name_user, birthday});
 
            return response.success('Usuário foi atualizado com sucesso', 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const checkUserExist = await userRepository.getById(id);

            if (!checkUserExist) {
                response.error(`Usuário de id ${id} não encontrado`, 404);
            }

            await userRepository.exclude(id);

            return response.success('Usuário foi excluído com sucesso', 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };
}