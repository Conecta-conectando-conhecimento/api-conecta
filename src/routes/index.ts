import { Router } from 'express';

import AuthRouter from './auth';
import { Middleware } from './middleware';
import UserRouter from './user';
import ProjectRouter from './project';
import FavoriteRouter from './favorites';
import ParticipantRouter from './participants';
import ParticipantViewRoutes from './participantView'
import ProjectFilesRouter from './projectFiles'
import InterestAreaRouter from './interestArea'
import UserAreasRouter from './userAreas'

const router = Router();

const middleware = new Middleware();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/project', ProjectRouter);
router.use('/favorite', FavoriteRouter);
router.use('/participants', ParticipantRouter);
router.use('/participant-view', ParticipantViewRoutes);
router.use('/projectfiles', ProjectFilesRouter)
router.use('/interestArea', InterestAreaRouter)
router.use('/userAreas', UserAreasRouter)

export default router;