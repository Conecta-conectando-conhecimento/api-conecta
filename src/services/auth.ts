import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { UserRepository } from '../repositories/user';
import { ILoginResponse, IResetPasswordToken } from '../types/interface';
import { resetPasswordEmail } from '../config/utils/reset_password_email';

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

    register = async (email: string, cpf: string, name: string, user_name: string, birthday: Date, password: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!name || !email || !password || !cpf) {
                return response.error('O nome, o email, o cpf e a senha são obrigatórios', 400);
            }

            if (cpf.length !== 11) {
                return response.error('CPF deve ter exatamente 11 caracteres', 400);
            }

            const checkCpfExist = await userRepository.getByCPF(cpf);
            if (checkCpfExist) {
                return response.error('CPF já cadastrado', 400);
            }

            const checkUserExist = await userRepository.getByEmail(email);

            if (checkUserExist) {
                return response.error('Email inválido', 400);
            }
        
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const roleIdDefault = 2;

            await userRepository.create({email, cpf, name, user_name, birthday, password: hashedPassword, role_id: roleIdDefault});

            return response.success('Usuário criado com sucesso', 201);
        } catch (error) {
            return response.error(error);
        }
    };

    forgotPassword = async (email: string, password: string) => {
        try {
            if (!email || !password) {
                return response.error('O email e a senha são obrigatórios', 400);
            }

            const user = await userRepository.getByEmail(email);

            if (!user) {
                return response.error('Email inválido', 400);
            }

            const comparePassword = bcrypt.compareSync(password, user.password);

            if (comparePassword) {
                return response.error('A nova senha não pode ser igual a senha atual', 400);
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const bodyToken: IResetPasswordToken = { user_id: user.id, password: hashedPassword };

            const token = jwt.sign(
                bodyToken,
                process.env.JWT_SECRET,
                { expiresIn: process.env.EXPIRES_PASSWORD_TOKEN || '30m' },
            );

            const sendEmail = await resetPasswordEmail(email, token);

            if (!sendEmail.status) {
                return response.error(sendEmail.message, 500);
            }

            return response.success(sendEmail.message, 200);
        } catch (error) {
            return response.error(error);
        }
    };

    resetPassword = async (token: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!token) {
                return response.error('O token é obrigatório', 400);
            }
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as IResetPasswordToken;

            if (!decoded) {
                return response.error('Token inválido', 400);
            }

            await userRepository.updatePassword(decoded.user_id, decoded.password);

            return response.success('Senha alterada com sucesso', 200); 
        } catch (error) {
            return response.error(error);
        }
    };

    async newPassword(email: string, newPassword: string) {
        try {
            if (!email || !newPassword) {
                return response.error('O email e a nova senha são obrigatórios', 400);
            }

            const user = await userRepository.getByEmail(email);

            if (!user) {
                return response.error('Usuário não encontrado', 404);
            }

            // Hash da nova senha
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(newPassword, salt);

            // Atualizar a senha do usuário no banco de dados
            await userRepository.updatePassword(user.id, hashedPassword);

            return response.success('Senha alterada com sucesso', 200);
        } catch (error) {
            return response.error(error);
        }
    }
}