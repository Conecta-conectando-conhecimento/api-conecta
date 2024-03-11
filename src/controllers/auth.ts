import { AuthService } from '../services/auth';

const authService = new AuthService();

export class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        const { codehttp, ...rest } = await authService.login(email, password);
        return res.status(codehttp).json(rest);
    }

    async register(req, res) {
        const { name, email, password } = req.body;
        const { codehttp, ...rest } = await authService.register(name, email, password);
        return res.status(codehttp).json(rest);
    }

    async forgotPassword(req, res) {
        const { email } = req.body;
        const { codehttp, ...rest } = await authService.forgotPassword(email);
        return res.status(codehttp).json(rest);
    }

    async resetPassword(req, res) {
        const { token, password } = req.body;
        const { codehttp, ...rest } = await authService.resetPassword(token, password);
        return res.status(codehttp).json(rest);
    }
}
