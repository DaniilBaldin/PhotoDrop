/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Photo from '../../models/photo';

import InfoRequest from '../../interface/albumsInterface';

const getPhotos = async (req: InfoRequest, res: Response) => {
    try {
        const album_id = req.params.id;
        const photo = await Photo.getPhotos(album_id);
        res.status(200).json({
            data: photo[0],
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

export default getPhotos;
