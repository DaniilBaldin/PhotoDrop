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

const s3Upload = async (files: any, body: any) => {
    const temp = [];
    for (const [key, value] of Object.entries(body)) {
        if (key.includes('clients')) {
            temp.push(value);
        }
    }
    temp.forEach(async (e: any) => {
        const options: any = {
            percentage: 25,
            // width: 385,
            // height: 385,
        };
        const buffer = files.buffer;
        const photo_logo: any = await makeThumbnail(new (Buffer.from as any)(buffer), options);

        const type = files.originalname.split('.')[1];
        const key = `upload/${crypto.randomUUID()}.${type}`;
        const keyThumb = `upload/${crypto.randomUUID()}.${type}`;

        const params = {
            ContentType: files.mimetype,
            Bucket: BUCKET,
            Body: files.buffer,
            Key: key,
        };
        const paramsThumb = {
            ContentType: files?.mimetype,
            Bucket: BUCKET,
            Body: photo_logo,
            Key: keyThumb,
        };

        s3.putObject(params as any).promise();
        s3.putObject(paramsThumb as any).promise();
        const photo_name = e || 'default';
        const photo_url = `https://${BUCKET}.s3.amazonaws.com/${params.Key}`;
        const thumb_url = `https://${BUCKET}.s3.amazonaws.com/${paramsThumb.Key}`;
        const id = body.album_id || 'Default';
        const result = await Photo.save(thumb_url, photo_name, photo_url, id);
        const resultParsed = JSON.parse(JSON.stringify(result));
        const photo_id = resultParsed[0].insertId;
        return {
            photo_id: photo_id,
            photo_logo: thumb_url,
            photo_url: photo_url,
            album_id: id,
        };
    });
};

export default s3Upload;
