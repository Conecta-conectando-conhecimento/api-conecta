"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../config/utils/response");
const user_1 = require("../repositories/user");
const reset_password_email_1 = require("../config/utils/reset_password_email");
const response = new response_1.ResponseOn();
const userRepository = new user_1.UserRepository();
class AuthService {
    constructor() {
        this.login = async (email, password) => {
            try {
                if (!email || !password) {
                    return response.error('O email e a senha são obrigatórios', 400);
                }
                const user = await userRepository.getByEmail(email);
                if (!user) {
                    return response.error('Crendenciais inválidas', 401);
                }
                const passwordStored = user.password;
                const comparePassword = bcryptjs_1.default.compareSync(password, passwordStored);
                if (!comparePassword) {
                    return response.error('Crendenciais inválidas', 401);
                }
                const expiresIn = process.env.EXPIRES_TOKEN || '86400';
                const accessToken = jsonwebtoken_1.default.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn });
                const responseFinal = {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                    accessToken,
                };
                return response.success(responseFinal, 200);
            }
            catch (error) {
                return response.error(error);
            }
        };
        this.register = async (email, cpf, name, user_name, birthday, password) => {
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
                const salt = bcryptjs_1.default.genSaltSync(10);
                const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
                const roleIdDefault = 2;
                await userRepository.create({ email, cpf, name, user_name, birthday, password: hashedPassword, role_id: roleIdDefault });
                return response.success('Usuário criado com sucesso', 201);
            }
            catch (error) {
                return response.error(error);
            }
        };
        this.forgotPassword = async (email, password) => {
            try {
                if (!email || !password) {
                    return response.error('O email e a senha são obrigatórios', 400);
                }
                const user = await userRepository.getByEmail(email);
                if (!user) {
                    return response.error('Email inválido', 400);
                }
                const comparePassword = bcryptjs_1.default.compareSync(password, user.password);
                if (comparePassword) {
                    return response.error('A nova senha não pode ser igual a senha atual', 400);
                }
                const salt = bcryptjs_1.default.genSaltSync(10);
                const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
                const bodyToken = { user_id: user.id, password: hashedPassword };
                const token = jsonwebtoken_1.default.sign(bodyToken, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_PASSWORD_TOKEN || '30m' });
                const sendEmail = await (0, reset_password_email_1.resetPasswordEmail)(email, token);
                if (!sendEmail.status) {
                    return response.error(sendEmail.message, 500);
                }
                return response.success(sendEmail.message, 200);
            }
            catch (error) {
                return response.error(error);
            }
        };
        this.resetPassword = async (token) => {
            try {
                if (!token) {
                    return response.error('O token é obrigatório', 400);
                }
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                if (!decoded) {
                    return response.error('Token inválido', 400);
                }
                await userRepository.updatePassword(decoded.user_id, decoded.password);
                return response.success('Senha alterada com sucesso', 200);
            }
            catch (error) {
                return response.error(error);
            }
        };
    }
    async newPassword(email, newPassword) {
        try {
            if (!email || !newPassword) {
                return response.error('O email e a nova senha são obrigatórios', 400);
            }
            const user = await userRepository.getByEmail(email);
            if (!user) {
                return response.error('Usuário não encontrado', 404);
            }
            // Hash da nova senha
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashedPassword = bcryptjs_1.default.hashSync(newPassword, salt);
            // Atualizar a senha do usuário no banco de dados
            await userRepository.updatePassword(user.id, hashedPassword);
            return response.success('Senha alterada com sucesso', 200);
        }
        catch (error) {
            return response.error(error);
        }
    }
    ;
}
exports.AuthService = AuthService;
