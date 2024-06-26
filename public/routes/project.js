"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_1 = require("../controllers/project");
const router = (0, express_1.Router)();
const projectController = new project_1.ProjectController();
router.get('/all', projectController.getAll);
router.get('/:id', projectController.getById);
router.post('/create', projectController.create);
router.put('/update/:id', projectController.update);
router.delete('/delete/:id', projectController.exclude);
exports.default = router;
