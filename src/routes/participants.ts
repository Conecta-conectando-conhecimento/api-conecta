import { Router } from 'express';
import { ParticipantController } from '../controllers/participants';

const router = Router();
const participantController = new ParticipantController();

router.get('/:id', participantController.getById); // Testado (funcioanndo)
router.get('/project/:projectId', participantController.getByProjectId); // Testado (funcioanndo)
router.get('/user/:userId', participantController.getByUserId);
router.post('/create', participantController.create);
router.put('/update/:id', participantController.update);
router.delete('/delete/:id', participantController.exclude);

export default router;