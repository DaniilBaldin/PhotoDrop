/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import Photo from '..//models/photo';
import makeThumbnail from 'image-thumbnail';

const BUCKET = process.env.S3_BUCKET;

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(credentials);
const s3 = new AWS.S3();

const s3Upload = async (files: any, album_id: any) => {
    console.log(files);
    const options: any = {
        percentage: 25,
        // width: 385,
        // height: 385,
    };
    const buffer = files[0].buffer;
    const photo_logo: any = await makeThumbnail(new (Buffer.from as any)(buffer), options);
    const type = files[0].originalname.split('.')[1];
    const key = `upload/${crypto.randomUUID()}.${type}`;
    const keyThumb = `upload/${crypto.randomUUID()}.${type}`;
    const params = {
        ContentType: files[0].mimetype,
        Bucket: BUCKET,
        Body: files[0].buffer,
        Key: key,
    };
    const paramsThumb = {
        ContentType: files[0]?.mimetype,
        Bucket: BUCKET,
        Body: photo_logo,
        Key: keyThumb,
    };
    s3.putObject(params as any).promise();
    s3.putObject(paramsThumb as any).promise();
    const client = files[1] || 'default';
    const photo_url = `https://${BUCKET}.s3.amazonaws.com/${params.Key}`;
    const thumb_url = `https://${BUCKET}.s3.amazonaws.com/${paramsThumb.Key}`;
    const id = album_id || 'Default';
    await Photo.save(thumb_url, client, photo_url, id);
};

export default s3Upload;
