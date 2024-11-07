// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import 'express-async-errors';

import { CognitoJwtVerifier } from 'aws-jwt-verify';
import express from 'express';
// var bodyParser = require('body-parser');
import { createServer } from 'http';

import env from './environment';
// import morgan from "morgan";
import { errorHandler } from './Errors/errorHandler';
// import knex from './Models/common';
import { RegisterRoutes } from './oapi/routes'; //eslint-disable-line import/no-unresolved

// let morganMiddleware: ReturnType<typeof morgan>;
// if (false) {
//   //   morganMiddleware = morgan(
//   //     (tokens, req, res) =>
//   //       JSON.stringify({
//   //         'remote-address': tokens['remote-addr'](req, res),
//   //         time: tokens['date'](req, res, 'iso'),
//   //         method: tokens['method'](req, res),
//   //         url: tokens['url'](req, res),
//   //         'http-version': tokens['http-version'](req, res),
//   //         'status-code': tokens['status'](req, res),
//   //         'content-length': tokens['res'](req, res, 'content-length'),
//   //         referrer: tokens['referrer'](req, res),
//   //         'user-agent': tokens['user-agent'](req, res),
//   //         'response-time': tokens['response-time'](req, res),
//   //         'total-time': tokens['total-time'](req, res),
//   //       }),
//   //     {
//   //       stream: { write: (message) => console.http('HTTP Request', JSON.parse(message)) },
//   //     }
//   //   );
// } else {
//   morganMiddleware = morgan("dev", {
//     stream: {
//       write: (message) =>
//         console.info(new Date().toLocaleTimeString(), { message }),
//     },
//   });
// }

const app = express();
const server = createServer(app);

const verifier = CognitoJwtVerifier.create({
  userPoolId: env.AWS_COGNITO_USER_POOL_ID,
  tokenUse: 'access',
  clientId: env.AWS_COGNITO_CLIENT_ID,
});

app.use(async (req: express.Request, res: express.Response, next: () => void) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const payload = await verifier.verify(
      token // the JWT as string
    );
    console.log('Token is valid. Payload:', payload);
    req.user = { username: payload.username };
    next();
  } catch {
    return res.status(403).json({ msg: 'Token is not valid' });
  }
});

// const serverUrl = new URL(env.API_HOST);

// app.use(
//   session({
//     proxy: env.IS_DEPLOYED_ENV,
//     secret: env.SESSION_SECRET,
//     store: pgSessionStorage,
//     saveUninitialized: false,
//     resave: false,
//     rolling: true,
//     cookie: {
//       domain: serverUrl.hostname,
//       maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
//       secure: env.IS_DEPLOYED_ENV,
//       httpOnly: true,
//       sameSite: env.IS_DEPLOYED_ENV ? 'none' : undefined,
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

RegisterRoutes(app);

app.use(errorHandler);

export default server;
