/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Photo from '../../models/photo';

import InfoRequest from '../../interface/albumsInterface';

const updatePhoto = async (req: InfoRequest, res: Response) => {
    const id = req.body.photo_id;
    try {
        Photo.getPhotoById(id)
            .then((result) => {
                console.log(result[0]);
                const updatePhoto = JSON.parse(JSON.stringify(result[0]));
                const photo_name = req.body.photo_name ?? updatePhoto.photo_name;
                console.log(photo_name);
                return [photo_name, id];
            })
            .then(async (result) => {
                await Photo.updatePhoto(result[0], result[1]);
            });
        // res.status(200).json('Updated!');
        res.status(200).json({
            data: 'Updated!',
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

export default updatePhoto;
