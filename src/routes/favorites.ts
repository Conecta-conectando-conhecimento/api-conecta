import { Router } from 'express';
import { FavoriteController } from '../controllers/Favorites';

const router = Router();
const favoriteController = new FavoriteController();

router.get('/:id', favoriteController.getById);
router.post('/create', favoriteController.create);
router.delete('/delete/:id', favoriteController.exclude);

export default router;
