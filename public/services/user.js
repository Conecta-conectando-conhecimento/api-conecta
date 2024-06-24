"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const response_1 = require("../config/utils/response");
const user_1 = require("../repositories/user");
const response = new response_1.ResponseOn();
const userRepository = new user_1.UserRepository();
class UserService {
    constructor() {
        this.getAll = async () => {
            try {
                const users = await userRepository.getAll();
                if (users.length === 0 || !users) {
                    return response.error('Nenhum usuário encontrado', 404);
                }
                return response.success(users, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.getByName = async (name) => {
            try {
                if (!name) {
                    return response.error('O nome é obrigatório', 400);
                }
                const users = await userRepository.getByName(name);
                if (!users) {
                    return response.error(`Usuário de nome ${name} não encontrado`, 404);
                }
                return response.success(users, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.getById = async (id) => {
            try {
                if (!id) {
                    return response.error('O id é obrigatório', 400);
                }
                const user = await userRepository.getById(id);
                if (!user) {
                    return response.error(`Usuário de id ${id} não encontrado`, 404);
                }
                return response.success(user, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.getByEmail = async (email) => {
            try {
                if (!email) {
                    return response.error('O email é obrigatório', 400);
                }
                const user = await userRepository.getByEmail(email);
                if (!user) {
                    return response.error(`Usuário de email ${email} não encontrado`, 404);
                }
                return response.success(user, 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
        this.update = async (id, payload) => {
            try {
                if (!id) {
                    return response.error('O id do usuário é obrigatório', 400);
                }
                const checkUserExist = await userRepository.getById(id);
                if (!checkUserExist) {
                    return response.error(`Usuário de id ${id} não encontrado`, 404);
                }
                const filteredPayload = Object.fromEntries(Object.entries(payload).filter(([_, value]) => value !== undefined));
                if (Object.keys(filteredPayload).length === 0) {
                    return response.error('Nenhum campo para atualizar foi fornecido', 400);
                }
                await userRepository.update(id, filteredPayload);
                return response.success('Usuário foi atualizado com sucesso', 200);
            }
            catch (error) {
                console.log(payload);
                return response.error(error, 500);
            }
        };
        this.exclude = async (id) => {
            try {
                if (!id) {
                    return response.error('O id é obrigatório', 400);
                }
                const checkUserExist = await userRepository.getById(id);
                if (!checkUserExist) {
                    return response.error(`Usuário de id ${id} não encontrado`, 404);
                }
                await userRepository.exclude(id);
                return response.success('Usuário foi excluído com sucesso', 200);
            }
            catch (error) {
                return response.error(error, 500);
            }
        };
    }
}
exports.UserService = UserService;
