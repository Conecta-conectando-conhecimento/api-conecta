import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import entities from '../entities';

const isProd = process.env.NODE_ENV === 'production';

const host = isProd ? process.env.PROD_POSTGRES_HOST : process.env.DEV_POSTGRES_HOST;
const port = isProd ? Number(process.env.PROD_POSTGRES_PORT) : Number(process.env.DEV_POSTGRES_PORT);
const username = isProd ? process.env.PROD_POSTGRES_USER : process.env.DEV_POSTGRES_USER;
const password = isProd ? process.env.PROD_POSTGRES_PASSWORD : process.env.DEV_POSTGRES_PASSWORD;
const database = isProd ? process.env.PROD_POSTGRES_DB : process.env.DEV_POSTGRES_DB;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    synchronize: false,
    entities,
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });