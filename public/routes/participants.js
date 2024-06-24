"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const participants_1 = require("../controllers/participants");
const router = (0, express_1.Router)();
const participantController = new participants_1.ParticipantController();
router.get('/:id', participantController.getById); // Testado (funcioanndo)
router.get('/project/:projectId', participantController.getByProjectId); // Testado (funcioanndo)
router.get('/user/:userId', participantController.getByUserId);
router.post('/create', participantController.create);
router.put('/update/:id', participantController.update);
router.delete('/delete/:id', participantController.exclude);
exports.default = router;
