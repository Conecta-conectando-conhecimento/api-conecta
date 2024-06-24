"use strict";
// import 'reflect-metadata';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from 'dotenv';
// import express from 'express';
// import router from './routes';
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.use(express.json());
// app.use(router);
// app.get('/', (req, res) => {
//     res.json({
//         message: 'API Conecta',
//         time: new Date().toString(),
//         path: __dirname,
//     });
// });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Importe o pacote cors
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(express_1.default.json());
// Configure o CORS
app.use((0, cors_1.default)());
app.use(routes_1.default);
app.get('/', (req, res) => {
    res.json({
        message: 'API Conecta',
        time: new Date().toString(),
    });
});
