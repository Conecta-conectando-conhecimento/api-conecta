"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../repositories/user");
const userRepository = new user_1.UserRepository();
class Middleware {
    async auth(req, res, next) {
        const token = req.headers.authorization;
        try {
            if (!token)
                throw new Error('Token não fornecido');
            const parts = token.split(' ');
            if (parts.length !== 2)
                throw new Error('Token error');
            const [scheme, tokenHash] = parts;
            if (scheme !== 'Bearer')
                throw new Error('Token malformado');
            if (!tokenHash)
                throw new Error('Token inválido');
            const decoded = jsonwebtoken_1.default.verify(tokenHash, process.env.JWT_SECRET);
            const user = await userRepository.getById(decoded.user_id);
            if (!user)
                throw new Error('Faça login para acessar sua conta');
            req.userId = Number(user.id);
            return next();
        }
        catch (error) {
            return res.status(401).json({ status: false, data: null, error: error.message });
        }
    }
}
exports.Middleware = Middleware;
