/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import Photo from '../models/photo';
import makeThumbnail from 'image-thumbnail';
import Convert from 'heic-convert';

import { addWatermark } from '../../Public/watermark';

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

    const markedImage = await addWatermark(convertedBuffer);
    const options: any = {
        percentage: 25,
        // width: 385,
        // height: 385,
    };
    const photo_logo: any = await makeThumbnail(new (Buffer.from as any)(convertedBuffer), options);
    const marked_logo = await makeThumbnail(new (Buffer.from as any)(markedImage), options);
    const type = 'jpeg';
    const key = `upload/${crypto.randomUUID()}.${type}`;
    const name = key.split('.').reverse()[1].split('/')[1];
    const keyMarked = `upload/${crypto.randomUUID()}.${type}`;
    const keyThumb = `upload/${crypto.randomUUID()}.${type}`;
    const keyThumbMarked = `upload/${crypto.randomUUID()}.${type}`;
    const params = {
        // ContentType: 'image/jpeg',
        ContentDisposition: `attachment;filename=${name}.jpg`,
        Bucket: BUCKET,
        Body: convertedBuffer,
        Key: key,
    };
    const paramsMarked = {
        ContentType: 'image/jpeg',
        Bucket: BUCKET,
        Body: markedImage,
        Key: keyMarked,
    };
    const paramsThumb = {
        ContentType: 'image/jpeg',
        Bucket: BUCKET,
        Body: photo_logo,
        Key: keyThumb,
    };
    const paramsThumbMarked = {
        ContentType: 'image/jpeg',
        Bucket: BUCKET,
        Body: marked_logo,
        Key: keyThumbMarked,
    };
    s3.putObject(params as any).promise();
    s3.putObject(paramsMarked as any).promise();
    s3.putObject(paramsThumb as any).promise();
    s3.putObject(paramsThumbMarked as any).promise();
    const client = files[1];
    const photo_url = `https://${BUCKET}.s3.amazonaws.com/${params.Key}`;
    const photo_url_marked = `https://${BUCKET}.s3.amazonaws.com/${paramsMarked.Key}`;
    const thumb_url = `https://${BUCKET}.s3.amazonaws.com/${paramsThumb.Key}`;
    const thumb_url_marked = `https://${BUCKET}.s3.amazonaws.com/${paramsThumbMarked.Key}`;
    const id = album_id || 'Default';
    await Photo.save(thumb_url, client, photo_url, id, photo_url_marked, thumb_url_marked);
};

export default s3UploadHeic;
