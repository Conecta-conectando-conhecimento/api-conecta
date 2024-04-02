import { Router } from 'express';
import { ProjectController } from '../controllers/project';

const router = Router();
const projectController = new ProjectController();

router.get('/all', projectController.getAll);
router.get('/:id', projectController.getById);
router.post('/create', projectController.create);
router.put('/update/:id', projectController.update);
router.delete('/delete/:id', projectController.exclude);

export default router;
