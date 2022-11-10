/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import Photo from '..//models/photo';
import makeThumbnail from 'image-thumbnail';

import { addWatermark } from '../../Public/watermark';

const BUCKET = process.env.S3_BUCKET;

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(credentials);
const s3 = new AWS.S3();

const s3Upload = async (files: any, album_id: any) => {
    const options: any = {
        percentage: 25,
    };
    const buffer = files[0].buffer;
    const markedImage = await addWatermark(buffer);
    const photo_logo: any = await makeThumbnail(new (Buffer.from as any)(buffer), options);
    const marked_logo = await makeThumbnail(new (Buffer.from as any)(markedImage), options);
    const type = files[0].originalname.split('.')[1];
    const key = `upload/${crypto.randomUUID()}.${type}`;
    const name = key.split('.').reverse()[1].split('/')[1];
    const keyMarked = `upload/${crypto.randomUUID()}.${type}`;
    const keyThumb = `upload/${crypto.randomUUID()}.${type}`;
    const keyThumbMarked = `upload/${crypto.randomUUID()}.${type}`;
    const params = {
        ContentDisposition: `attachment;filename=${name}.jpg`,
        Bucket: BUCKET,
        Body: files[0].buffer,
        Key: key,
    };
    const paramsMarked = {
        ContentType: files[0].mimetype,
        Bucket: BUCKET,
        Body: markedImage,
        Key: keyMarked,
    };
    const paramsThumb = {
        ContentType: files[0]?.mimetype,
        Bucket: BUCKET,
        Body: photo_logo,
        Key: keyThumb,
    };
    const paramsThumbMarked = {
        ContentType: files[0]?.mimetype,
        Bucket: BUCKET,
        Body: marked_logo,
        Key: keyThumbMarked,
    };
    s3.putObject(params as any).promise();
    s3.putObject(paramsMarked as any).promise();
    s3.putObject(paramsThumb as any).promise();
    s3.putObject(paramsThumbMarked as any).promise();
    const client = files[1] || 'default';
    const photo_url = `https://${BUCKET}.s3.amazonaws.com/${params.Key}`;
    const photo_url_marked = `https://${BUCKET}.s3.amazonaws.com/${paramsMarked.Key}`;
    const thumb_url = `https://${BUCKET}.s3.amazonaws.com/${paramsThumb.Key}`;
    const thumb_url_marked = `https://${BUCKET}.s3.amazonaws.com/${paramsThumbMarked.Key}`;
    const id = album_id || 'Default';
    await Photo.save(thumb_url, client, photo_url, id, photo_url_marked, thumb_url_marked);
};

export default s3Upload;
