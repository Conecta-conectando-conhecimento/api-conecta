import { Router } from 'express';
import { UserController } from '../controllers/user';

const router = Router();

const userController = new UserController();

router.get('/all', userController.getAll);
router.get('/:id', userController.getById);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.exclude);

export default router;