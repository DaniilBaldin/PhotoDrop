/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import Photo from '../../models/photo';

const getPhotosById: RequestHandler = async (req, res) => {
    try {
        const photo_id = req.body.photo_id;
        console.log(photo_id);
        const photoResult = await Photo.getPhotoById(photo_id);
        // res.status(200).json(photoResult[0]);
        res.status(200).json({
            data: photoResult[0],
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

export default getPhotosById;
