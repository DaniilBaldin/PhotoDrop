/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import Photo from '..//models/photo';
import makeThumbnail from '../services/thumbnailService';

const BUCKET = process.env.S3_BUCKET;

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(credentials);
const s3 = new AWS.S3();

const s3Upload = async (files: any, album_id: any) => {
    files.forEach(async (e: any) => {
        const photo_logo = await makeThumbnail(e);
        console.log(photo_logo);
        const type = e.originalname.split('.')[1];
        const typeThumb = photo_logo?.originalname.split('.').reverse()[0];
        const key = `upload/${crypto.randomUUID()}.${type}`;
        const keyThumb = `upload/${crypto.randomUUID()}.${typeThumb}`;

        const params = {
            ContentType: e.mimetype,
            Bucket: BUCKET,
            Body: e.buffer,
            Key: key,
        };
        const paramsThumb = {
            ContentType: photo_logo?.mimetype,
            Bucket: BUCKET,
            Body: photo_logo?.buffer,
            Key: keyThumb,
        };

        s3.putObject(params as any).promise();
        s3.putObject(paramsThumb as any).promise();
        const photo_name = e.originalname;
        const photo_url = `https://${BUCKET}.s3.amazonaws.com/${params.Key}`;
        const thumb_url = `https://${BUCKET}.s3.amazonaws.com/${paramsThumb.Key}`;
        const id = album_id || 'Default';
        await Photo.save(thumb_url, photo_name, photo_url, id);
    });
};

export default s3Upload;
