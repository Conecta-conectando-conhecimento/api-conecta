import { UserService } from '../services/user';

const userService = new UserService();

export class UserController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await userService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await userService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async getByEmail(req, res) {
        const { email } = req.params;
        const { codehttp, ...rest } = await userService.getByEmail(email);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, email, name_user, birthday } = req.body;
        const { codehttp, ...rest } = await userService.update(id, email, name, name_user, birthday);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await userService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}
