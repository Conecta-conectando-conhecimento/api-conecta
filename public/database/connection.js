"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const entities_1 = __importDefault(require("../entities"));
const isProd = process.env.NODE_ENV === 'production';
const host = isProd ? process.env.PROD_POSTGRES_HOST : process.env.DEV_POSTGRES_HOST;
const port = isProd ? Number(process.env.PROD_POSTGRES_PORT) : Number(process.env.DEV_POSTGRES_PORT);
const username = isProd ? process.env.PROD_POSTGRES_USER : process.env.DEV_POSTGRES_USER;
const password = isProd ? process.env.PROD_POSTGRES_PASSWORD : process.env.DEV_POSTGRES_PASSWORD;
const database = isProd ? process.env.PROD_POSTGRES_DB : process.env.DEV_POSTGRES_DB;
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    synchronize: false,
    entities: entities_1.default,
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
