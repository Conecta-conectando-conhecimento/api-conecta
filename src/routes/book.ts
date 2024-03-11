import { Router } from 'express';

import { BookController } from '../controllers/book';

const router = Router();

const bookController = new BookController();

router.get('/all', bookController.getAll);
router.get('/all/complete', bookController.getAllWithCompleteInfo);
router.get('/:id', bookController.getById);
router.get('/search', bookController.getByTitle);

router.post('/create', bookController.create);
router.post('/create/complete', bookController.createWithCompleteInfo);

router.put('/update/:id', bookController.update);
router.delete('/delete/:id', bookController.exclude);

export default router;