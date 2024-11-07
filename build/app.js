"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
require("express-async-errors");
const aws_jwt_verify_1 = require("aws-jwt-verify");
const express_1 = __importDefault(require("express"));
// var bodyParser = require('body-parser');
const http_1 = require("http");
const environment_1 = __importDefault(require("./environment"));
// import morgan from "morgan";
const errorHandler_1 = require("./Errors/errorHandler");
// import knex from './Models/common';
const routes_1 = require("./oapi/routes"); //eslint-disable-line import/no-unresolved
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
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const verifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
    userPoolId: environment_1.default.AWS_COGNITO_USER_POOL_ID,
    tokenUse: 'access',
    clientId: environment_1.default.AWS_COGNITO_CLIENT_ID,
});
app.use(async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const payload = await verifier.verify(token // the JWT as string
        );
        console.log('Token is valid. Payload:', payload);
        req.user = { username: payload.username };
        next();
    }
    catch {
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
(0, routes_1.RegisterRoutes)(app);
app.use(errorHandler_1.errorHandler);
exports.default = server;
