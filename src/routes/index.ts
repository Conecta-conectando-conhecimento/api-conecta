import { Router } from 'express';

import AuthRouter from './auth';
import { Middleware } from './middleware';
import UserRouter from './user';
import ProjectRouter from './project';
import FavoriteRouter from './favorites';
import ParticipantRouter from './participants';

const router = Router();

const middleware = new Middleware();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/project', ProjectRouter);
router.use('/favorite', FavoriteRouter);
router.use('/participants', ParticipantRouter);

export default router;