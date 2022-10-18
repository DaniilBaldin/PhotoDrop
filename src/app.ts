/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import adminRouter from './routes/adminRoutes';
import photoRouter from './routes/photoRoutes';
import albumRouter from './routes/albumRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());

// app.use(
//     cors({
//         origin: '*',
//         // origin: [
//         //     'https://photographers-admin.vercel.app',
//         //     'https://photographers-admin.vercel.app/album',
//         //     'https://photographers-admin.vercel.app/',
//         //     'https://photodrop-app-1.herokuapp.com/album',
//         //     'https://photodrop-app-1.herokuapp.com/',
//         //     'https://photodrop-app-1.herokuapp.com',
//         // ],
//         methods: ['PUT', 'GET', 'HEAD', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
//         allowedHeaders: [
//             'Content-Type',
//             'Authorization',
//             'Uppy-Versions',
//             'Accept',
//             'x-requested-with',
//             'Access-Control-Allow-Origin',
//         ],
//         credentials: true,
//         exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers'],
//     })
// );

// app.use(
//     cors({
//         origin: ['http://localhost:5173/', 'http://localhost:5173', 'http://127.0.0.1:5173/', 'http://127.0.0.1:5173'],
//         methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
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

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     // res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

app.get('/', (req, res) => {
    res.send('Hello there! General Kenobi!');
});

app.use('/', adminRouter, photoRouter, albumRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const date = new Date();
console.log(date);
