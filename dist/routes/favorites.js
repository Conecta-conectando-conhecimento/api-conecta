"use strict";
// src/routes/favorites.js
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorites_1 = require("../controllers/favorites");
const router = (0, express_1.Router)();
const favoriteController = new favorites_1.FavoriteController();
router.get('/:id', favoriteController.getById);
router.get('/user/:userId', favoriteController.getFavoritesByUserId);
router.post('/create', favoriteController.create);
router.delete('/delete/', favoriteController.exclude);
exports.default = router;
