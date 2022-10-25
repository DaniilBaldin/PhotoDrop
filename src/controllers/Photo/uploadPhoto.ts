/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import s3Upload from '../../services/s3Upload';
// import s3UploadHeic from '../../services/s3UploadHeic';

const uploadPhoto = async (req: any, res: Response) => {
    try {
        console.log(req);
        const { album_id } = req.body;
        const files = req.files;
        files.forEach(async (e: any) => {
            if (e.originalname.split('.').reverse()[0] !== 'heic') {
                await s3Upload(e, album_id);
            }
            // else {
            //     await s3UploadHeic(e, album_id);
            // }
        });
        res.status(200).json({
            data: 'Saved!',
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

export default uploadPhoto;
