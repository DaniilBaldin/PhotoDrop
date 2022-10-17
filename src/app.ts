/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'cookie-session';
import companion from '@uppy/companion';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import path from 'path';

import adminRouter from './routes/adminRoutes';
import photoRouter from './routes/photoRoutes';
import albumRouter from './routes/albumRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
    cors({
        origin: '*',
        methods: ['OPTIONS', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Uppy-Versions', 'Accept', 'Access-Control-Allow-Origin'],
        exposedHeaders: ['Access-Control-Allow-Headers', 'Access-Control-Allow-Origin'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.use(bodyParser.json());
app.use(session({ secret: 'some secrety secret' }));

app.use(express.static(path.join(__dirname, '../', '/public')));

const options = {
    s3: {
        getKey: (req: string, filename: string) => `${crypto.randomUUID()}/${filename}`,
        key: process.env.AWS_KEY,
        secret: process.env.AWS_SECRET,
        bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        useAccelerateEndpoint: false,
        expires: 3600,
    },
    server: {
        host: 'localhost:3020',
        protocol: 'http',
        path: '/companion',
    },
    filePath: './',
    secret: 'mysecret',
    uploadUrls: ['https://myuploadurl.com', /^http:\/\/myuploadurl2.com\//],
    corsOrigins: false,
};

const { app: companionApp } = companion.app(options);

app.use('/companion', companionApp);

const server = app.listen(3020);

companion.socket(server);

app.get('/', (req, res) => {
    res.send('Hello there, General Kenobi!');
});

app.use(express.json());
app.use(cookieParser());

app.use('/', adminRouter, photoRouter, albumRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const date = new Date();
console.log(date);
