"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interestArea_1 = require("../controllers/interestArea");
const router = (0, express_1.Router)();
const interestAreaController = new interestArea_1.InterestAreaController();
router.get('/all', interestAreaController.getAll);
exports.default = router;
