import { Router } from 'express';
import { UserAreasController } from '../controllers/userAreas';

const router = Router();

const userAreasController = new UserAreasController();

router.get('/all', userAreasController.getAll);

export default router;