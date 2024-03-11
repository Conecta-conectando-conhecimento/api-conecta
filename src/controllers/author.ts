import { AuthorService } from '../services/author';

const authorService = new AuthorService();

export class AuthorController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await authorService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await authorService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { name, description } = req.body;
        const { codehttp, ...rest } = await authorService.create(name, description);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;
        const { codehttp, ...rest } = await authorService.update(id, name, description);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await authorService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}
