/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import s3Upload from '../../services/s3Upload';
import s3UploadHeic from '../../services/s3UploadHeic';
import Photo from '../../models/photo';

const uploadPhotos = async (req: any, res: Response) => {
    try {
        const { album_id } = req.body;
        const body = req.body;
        const files = req.files;
        const clients: any[] = [];
        for (const [key, value] of Object.entries(body)) {
            if (key.includes('clients')) {
                clients.push(value);
            }
        }
        const combined: any[] = [];
        files.forEach((file: any, index: any) => {
            combined.push([file, clients[index]]);
        });
        combined.forEach(async (e: any) => {
            if (e[0].originalname.split('.').reverse()[0] !== 'heic') {
                await s3Upload(e, album_id);
            } else {
                await s3UploadHeic(e, album_id);
            }
        });
        Photo.getPhotos(album_id).then((result) => {
            res.status(200).json({
                data: result[0],
                success: true,
            });
        });
    } catch (err) {
        res.json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default uploadPhotos;
