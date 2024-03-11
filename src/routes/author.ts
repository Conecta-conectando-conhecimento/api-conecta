import { Router } from 'express';

import { AuthorController } from '../controllers/author';

const router = Router();

const authorController = new AuthorController();

router.get('/all', authorController.getAll);
router.get('/:id', authorController.getById);
router.post('/create', authorController.create);
router.put('/update/:id', authorController.update);
router.delete('/delete/:id', authorController.exclude);

export default router;