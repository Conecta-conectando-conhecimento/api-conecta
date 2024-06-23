import { UserService } from '../services/user';

const userService = new UserService();

export class UserController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await userService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getByName(req, res) {
        const { name } = req.params;
        const { codehttp, ...rest } = await userService.getByName(name);
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
        const { email, cpf, name, user_name, birthday, password, campus, sobre, linkedin, instagram, user_image_path } = req.body;

        const payload = {
            email,
            cpf,
            name,
            user_name,
            birthday,
            password,
            campus,
            sobre,
            linkedin,
            instagram,
            user_image_path
        };

        const { codehttp, ...rest } = await userService.update(Number(id), payload);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await userService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}
