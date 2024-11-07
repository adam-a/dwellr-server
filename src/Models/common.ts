import knex from 'knex';
import path from 'path';

// import path from 'path';
import env from '../environment';

const IS_TEST_ENV = process.env.NODE_ENV === 'test';
let dotenvPath = path.resolve(process.cwd(), '.env');
if (IS_TEST_ENV) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dotenvPath = path.resolve(process.cwd(), '.env-local');
}

IS_TEST_ENV ? env.TEST_PGURL : env.PGURL;

export default knex({
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
