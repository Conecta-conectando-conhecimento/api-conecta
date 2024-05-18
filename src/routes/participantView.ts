import { Router } from 'express';
import { ParticipantViewController } from '../controllers/participantView';

const router = Router();
const participantViewController = new ParticipantViewController();

router.get('/:id', participantViewController.getById);
router.get('/project/:projectId', participantViewController.getByProjectId);
router.get('/user/:userId', participantViewController.getByUserId);

export default router;
