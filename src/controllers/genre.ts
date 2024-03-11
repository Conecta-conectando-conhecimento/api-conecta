import { GenreService } from '../services/genre';

const genreService = new GenreService();

export class GenreController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await genreService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await genreService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { name } = req.body;
        const { codehttp, ...rest } = await genreService.create(name);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        const { codehttp, ...rest } = await genreService.update(id, name);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await genreService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}
