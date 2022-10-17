/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'cookie-session';
// import companion from '@uppy/companion';
import cookieParser from 'cookie-parser';
// import crypto from 'crypto';
import path from 'path';

import adminRouter from './routes/adminRoutes';
import photoRouter from './routes/photoRoutes';
import albumRouter from './routes/albumRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
    cors({
        origin: ['http://localhost:5173/', 'http://localhost:5173/', 'http://127.0.0.1:5173/'],
        methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

// app.use(
//     cors({
//         origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
//         methods: ['OPTIONS', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'UPDATE'],
//         allowedHeaders: [
//             'Content-Type',
//             'Authorization',
//             'Uppy-Versions',
//             'Accept',
//             'x-requested-with',
//             'Access-Control-Allow-Origin',
//         ],
//         exposedHeaders: ['Access-Control-Allow-Headers', 'Access-Control-Allow-Origin'],
//         preflightContinue: false,
//         optionsSuccessStatus: 204,
//     })
// );

app.use(bodyParser.json());
// app.use(session({ secret: 'some secrety secret' }));

app.use(express.static(path.join(__dirname, '../', '/public')));

app.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello there! General Kenobi!');
});

app.use(express.json());
// app.use(cookieParser());

app.use('/', adminRouter, photoRouter, albumRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const date = new Date();
console.log(date);
