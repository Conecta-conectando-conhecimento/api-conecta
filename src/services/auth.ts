import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { UserRepository } from '../repositories/user';
import { ILoginResponse, IUserToken } from '../types/interface';

const response = new ResponseOn();
const userRepository = new UserRepository();

export class AuthService {
    login = async (email: string, password: string): Promise<APIResponse<ILoginResponse, ErrorTypes>> => {
        try {
            if (!email || !password) {
                return response.error('O email e a senha são obrigatórios', 400);
            }

            const user = await userRepository.getByEmail(email);

            if (!user) {
                return response.error('Crendenciais inválidas', 401);
            }

            const passwordStored = user.password;

            const comparePassword = bcrypt.compareSync(password, passwordStored);

            if (!comparePassword) {
                return response.error('Crendenciais inválidas', 401);
            }

            const expiresIn = process.env.EXPIRES_TOKEN || '86400';

            const accessToken = jwt.sign(
                { user_id: user.id }, 
                process.env.JWT_SECRET,
                { expiresIn },
            );

            const responseFinal = {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                accessToken,
            };

            return response.success(responseFinal, 200);
        } catch (error) {
            return response.error(error);
        }
    };

    register = async (name: string, email: string, password: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!name || !email || !password) {
                return response.error('O nome, o email e a senha são obrigatórios', 400);
            }

            const checkUserExist = await userRepository.getByEmail(email);

            if (checkUserExist) {
                return response.error('Email inválido', 400);
            }
        
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const roleIdDefault = 2;

            await userRepository.create({name, email, password: hashedPassword, role_id: roleIdDefault});

            return response.success('Usuário criado com sucesso', 201);
        } catch (error) {
            return response.error(error);
        }
    };

    forgotPassword = async (email: string) => {
        try {
            if (!email) {
                return response.error('O email é obrigatório', 400);
            }

            const user = await userRepository.getByEmail(email);

            if (!user) {
                return response.error('Email inválido', 400);
            }

            // TODO: Serviço de envio de email

            // const enviarEmail = await sendEmail(email);

            // if (!enviarEmail) {
            //     return response.error('Não foi possível enviar o email', 500);
            // }

            return response.success('Email enviado com sucesso', 200);
        } catch (error) {
            return response.error(error);
        }
    };

    resetPassword = async (token: string, password: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!token || !password) {
                return response.error('O token e a senha são obrigatórios', 400);
            }
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as IUserToken;

            const  user = await userRepository.getById(decoded.user_id);

            if (!user) {
                return response.error('Token inválido', 400);
            }

            const comparePassword = bcrypt.compareSync(password, user.password);

            if (comparePassword) {
                return response.error('A nova senha não pode ser igual a senha atual', 400);
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            await userRepository.updatePassword(user.id, hashedPassword);

            return response.success('Senha alterada com sucesso', 200);

        } catch (error) {
            return response.error(error);
        }
    };
}