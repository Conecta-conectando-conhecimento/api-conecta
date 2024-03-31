import { Router } from 'express';
import { ProjectController } from '../controllers/project';

const router = Router();
const projectController = new ProjectController();

router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.exclude);

export default router;
