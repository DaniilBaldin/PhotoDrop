/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import s3Upload from '../../services/s3Upload';

const uploadPhotos = async (req: any, res: Response) => {
    try {
        const { album_id } = req.body;
        await s3Upload(req.files, album_id);
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

export default uploadPhotos;
