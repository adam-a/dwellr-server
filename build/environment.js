"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const IS_TEST_ENV = process.env.NODE_ENV === 'test';
let dotenvPath = path_1.default.resolve(process.cwd(), '.env');
if (IS_TEST_ENV) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dotenvPath = path_1.default.resolve(process.cwd(), '.env-local');
}
const { API_HOST = '', PORT = '8080', TEST_PGURL = 'postgres://dwellr:dwellrme@localhost:5432/dwellr_test', PG_POOL_MAX = '10', PG_POOL_MIN = '0', PGURL = 'postgres://dwellr:dwellrme@localhost:5432/dwellr', OPENAI_API_KEY = '', UPLOAD_BUCKET = '', UPLOAD_CF = '', SERVER_ENV = 'dev', AWS_ENDPOINT = '', AWS_REGION = 'us-east-1', AWS_COGNITO_CLIENT_ID = '', AWS_COGNITO_USER_POOL_ID = '', } = process.env;
const env = {
    PORT,
    API_HOST,
    PG_POOL_MAX: parseInt(PG_POOL_MAX),
    PG_POOL_MIN: parseInt(PG_POOL_MIN),
    TEST_PGURL,
    PGURL,
    OPENAI_API_KEY,
    UPLOAD_BUCKET,
    UPLOAD_CF,
    SERVER_ENV,
    AWS_ENDPOINT,
    AWS_REGION,
    AWS_COGNITO_CLIENT_ID,
    AWS_COGNITO_USER_POOL_ID,
};
exports.default = env;