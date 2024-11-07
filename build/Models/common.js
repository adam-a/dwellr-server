"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const path_1 = __importDefault(require("path"));
// import path from 'path';
const environment_1 = __importDefault(require("../environment"));
const IS_TEST_ENV = process.env.NODE_ENV === 'test';
let dotenvPath = path_1.default.resolve(process.cwd(), '.env');
if (IS_TEST_ENV) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dotenvPath = path_1.default.resolve(process.cwd(), '.env-local');
}
IS_TEST_ENV ? environment_1.default.TEST_PGURL : environment_1.default.PGURL;
exports.default = (0, knex_1.default)({
    client: 'pg',
    connection: {
        user: 'dwellr',
        host: 'dwellr.cxldlwaguxam.us-east-1.rds.amazonaws.com',
        database: 'postgres',
        password: '29h23d92hu',
        port: 5432,
        ssl: {
            requestCert: true,
            rejectUnauthorized: false,
        },
    },
    searchPath: ['knex', 'public'],
    pool: {
        min: 0,
        max: 10,
    },
});
