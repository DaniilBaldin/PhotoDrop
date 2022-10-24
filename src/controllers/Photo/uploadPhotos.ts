/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import s3Upload from '../../services/s3Upload';
import s3UploadHeic from '../../services/s3UploadHeic';
import Photo from '../../models/photo';

const uploadPhotos = async (req: any, res: Response) => {
    try {
        console.log(req);
        const { album_id } = req.body;
        const files = req.files;
        files.forEach(async (e: any) => {
            if (e.originalname.split('.').reverse()[0] !== 'heic') {
                await s3Upload(e, album_id);
            } else {
                await s3UploadHeic(e, album_id);
            }
        });
        const photos = await Photo.getPhotos(album_id);
        res.status(200).json({
            data: photos[0],
            success: true,
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
