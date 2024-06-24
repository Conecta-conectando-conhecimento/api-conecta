"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const isProd = process.env.NODE_ENV === 'production';
const host = isProd ? process.env.PROD_POSTGRES_HOST : process.env.DEV_POSTGRES_HOST;
const port = isProd ? Number(process.env.PROD_POSTGRES_PORT) : Number(process.env.DEV_POSTGRES_PORT);
const username = isProd ? process.env.PROD_POSTGRES_USER : process.env.DEV_POSTGRES_USER;
const password = isProd ? process.env.PROD_POSTGRES_PASSWORD : process.env.DEV_POSTGRES_PASSWORD;
const database = isProd ? process.env.PROD_POSTGRES_DB : process.env.DEV_POSTGRES_DB;
const entities = isProd ? [process.env.PROD_POSTGRES_ENTITIES] : [process.env.DEV_POSTGRES_ENTITIES];
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    synchronize: false,
    entities,
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
