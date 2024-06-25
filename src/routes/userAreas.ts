import { Router } from 'express';
import { UserAreasController } from '../controllers/userAreas';

const router = Router();

const userAreasController = new UserAreasController();

router.get('/all', userAreasController.getAll);
router.get('/user/:userId', userAreasController.getByUserId);
router.post('/create', userAreasController.create);
router.delete('/delete/:user_id/:area_id', userAreasController.exclude);

export default router;