/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
dotenv.config();
import crypto from 'crypto';

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(credentials);

const s3Upload = async (files: any[]) => {
    const config = {};
    const s3client = new S3Client(config);
    const urls: any[] = [];

    const params = files.map((file: any) => {
        const key = `upload/${crypto.randomUUID()}-${file.originalname}`.replace(/ /g, '');
        urls.push(`${process.env.PRE_URL}${key}`);
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
        };
    });

    const result = await Promise.all(params.map((param) => s3client.send(new PutObjectCommand(param))));
    result.forEach((item: any, index) => (item.url = urls[index]));

    return result;
};

export default s3Upload;
