/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

import Metadata from '../../models/metadata';

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(credentials);

const s3 = new AWS.S3();
const BUCKET = process.env.S3_BUCKET;

const deletePhotosById: RequestHandler = async (req, res) => {
    try {
        const id = <any>req.params.id;
        await Metadata.deletePhotoById(id);
        const photoToDelete = await Metadata.getPhotoById(id);
        const result = Object.values(JSON.parse(JSON.stringify(photoToDelete[0])));
        result.forEach(async (e: any) => {
            const albumName = e.photo_url.split('/').reverse();
            const key = `${albumName[1]}/${albumName[0]}`;
            const params = {
                Bucket: BUCKET,
                Key: key,
            };
            await s3.deleteObject(params as any, (err, data) => {
                if (err) console.log(err);
                else console.log(data);
            });
        });
        res.status(200).send('Deleted!');
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default deletePhotosById;
