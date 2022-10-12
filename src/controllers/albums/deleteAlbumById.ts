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
const BUCKET: any = process.env.S3_BUCKET;

const emptyS3Directory = async (prefix: string) => {
    const listParams = {
        Bucket: BUCKET,
        Prefix: prefix, // ex. path/to/folder
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents?.length === 0) return;

    const deleteParams = {
        Bucket: BUCKET,
        Delete: { Objects: [] as any },
    };

    listedObjects.Contents?.forEach((content: any) => {
        deleteParams.Delete.Objects.push({ Key: content.Key });
    });

    console.log(deleteParams);

    await s3.deleteObjects(deleteParams).promise();

    if (listedObjects.IsTruncated) await emptyS3Directory(prefix);
};

const deleteAlbumById: RequestHandler = async (req, res) => {
    try {
        const id = <any>req.params.id;
        await Metadata.deleteAlbumById(id);
        const albumsToDelete = await Metadata.getAlbumById(id);
        const result = Object.values(JSON.parse(JSON.stringify(albumsToDelete[0])));
        result.forEach(async (e: any) => {
            const albumName = e.photo_url.split('/').reverse();
            console.log(albumName[1]);
            await emptyS3Directory(`${albumName[1]}/`);
        });
        res.status(200).send('Deleted!');
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default deleteAlbumById;
