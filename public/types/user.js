"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const connection_1 = require("../database/connection");
const user_1 = require("../entities/user");
const userRepository = connection_1.AppDataSource.getRepository(user_1.UserEntity);
class UserRepository {
    constructor() {
        this.getAll = async (page, limit) => {
            const skipNumber = page || 1;
            const takeNumber = limit || 20;
            return await userRepository.find({
                skip: (skipNumber - 1) * takeNumber,
                take: takeNumber,
            });
        };
        this.getById = async (id) => {
            return await userRepository.findOneBy({ id });
        };
        this.getByEmail = async (email) => {
            return await userRepository.findOneBy({ email });
        };
        this.getByCPF = async (cpf) => {
            return await userRepository.findOneBy({ cpf });
        };
        this.create = async (createUserDTO) => {
            await userRepository.insert(createUserDTO);
        };
        this.update = async (id, updateUserDTO) => {
            await userRepository.update(id, updateUserDTO);
        };
        this.updatePassword = async (id, password) => {
            await userRepository.update(id, { password });
        };
        this.exclude = async (id) => {
            await userRepository.delete({ id });
        };
    }
}
exports.UserRepository = UserRepository;
