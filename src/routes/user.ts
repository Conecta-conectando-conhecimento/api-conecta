import { Router } from 'express';
import { UserController } from '../controllers/user';

const router = Router();

const userController = new UserController();

router.get('/all', userController.getAll);
router.get('/name/:name', userController.getByName);
router.get('/:id', userController.getById);
router.get('/email/:email', userController.getByEmail);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.exclude);

export default router;