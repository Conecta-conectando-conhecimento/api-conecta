import { Router } from 'express';
import { ProjectFilesController } from '../controllers/projectFiles';

const router = Router();
const projectFilesController = new ProjectFilesController();

router.get('/all', projectFilesController.getAll);
router.get('/:id', projectFilesController.getById);
router.get('/project/:project_id', projectFilesController.getByProject)
router.post('/create', projectFilesController.create);
router.put('/update/:id', projectFilesController.update);
router.delete('/delete/:id', projectFilesController.exclude);

export default router;
