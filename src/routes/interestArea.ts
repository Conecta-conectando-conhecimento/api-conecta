import { Router } from 'express';
import { InterestAreaController } from '../controllers/interestArea';

const router = Router();
const interestAreaController = new InterestAreaController();

router.get('/all', interestAreaController.getAll);



export default router;