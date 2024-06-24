// src/routes/favorites.js

import { Router } from 'express';
import { FavoriteController } from '../controllers/favorites';

const router = Router();
const favoriteController = new FavoriteController();

router.get('/:id', favoriteController.getById);
router.get('/user/:userId', favoriteController.getFavoritesByUserId);
router.post('/create', favoriteController.create);
router.delete('/delete/', favoriteController.exclude);

export default router;
