import { Router } from 'express';

import { GenreController } from '../controllers/genre';

const router = Router();

const genreController = new GenreController();

router.get('/all', genreController.getAll);
router.get('/:id', genreController.getById);
router.post('/create', genreController.create);
router.put('/update/:id', genreController.update);
router.delete('/delete/:id', genreController.exclude);

export default router;