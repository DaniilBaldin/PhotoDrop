/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import Photo from '../models/photo';
import makeThumbnail from 'image-thumbnail';
import Convert from 'heic-convert';

const BUCKET = process.env.S3_BUCKET;

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(credentials);
const s3 = new AWS.S3();

const s3UploadHeic = async (files: any, album_id: any) => {
    const buffer = files[0].buffer;
    const convert = async () => {
        const outBuffer = await Convert({
            buffer: buffer,
            format: 'JPEG',
            quality: 1,
        });
        return outBuffer;
    };
    const convertedBuffer = await convert();
    const options: any = {
        percentage: 25,
        // width: 385,
        // height: 385,
    };
    const photo_logo: any = await makeThumbnail(new (Buffer.from as any)(convertedBuffer), options);

    const type = 'jpeg';
    const key = `upload/${crypto.randomUUID()}.${type}`;
    const keyThumb = `upload/${crypto.randomUUID()}.${type}`;

    const params = {
        ContentType: 'image/jpeg',
        Bucket: BUCKET,
        Body: convertedBuffer,
        Key: key,
    };
    const paramsThumb = {
        ContentType: 'image/jpeg',
        Bucket: BUCKET,
        Body: photo_logo,
        Key: keyThumb,
    };
    console.log(params, paramsThumb);

    s3.putObject(params as any).promise();
    s3.putObject(paramsThumb as any).promise();
    const client = files[1];
    const photo_url = `https://${BUCKET}.s3.amazonaws.com/${params.Key}`;
    const thumb_url = `https://${BUCKET}.s3.amazonaws.com/${paramsThumb.Key}`;
    const id = album_id || 'Default';
    await Photo.save(thumb_url, client, photo_url, id);
};

export default s3UploadHeic;
