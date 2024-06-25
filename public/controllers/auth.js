"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_1 = require("../services/auth");
const authService = new auth_1.AuthService();
class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        const { codehttp, ...rest } = await authService.login(email, password);
        return res.status(codehttp).json(rest);
    }
    async newPassword(req, res) {
        const { email, newPassword } = req.body;
        const { codehttp, ...rest } = await authService.newPassword(email, newPassword);
        return res.status(codehttp).json(rest);
    }
    async register(req, res) {
        const { email, cpf, name, user_name, birthday, password } = req.body;
        const { codehttp, ...rest } = await authService.register(email, cpf, name, user_name, birthday, password);
        return res.status(codehttp).json(rest);
    }
    async forgotPassword(req, res) {
        const { email, password } = req.body;
        const { codehttp, ...rest } = await authService.forgotPassword(email, password);
        return res.status(codehttp).json(rest);
    }
    async resetPassword(req, res) {
        const { token } = req.body;
        const { codehttp, ...rest } = await authService.resetPassword(token);
        return res.status(codehttp).json(rest);
    }
}
exports.AuthController = AuthController;
