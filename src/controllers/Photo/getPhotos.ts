/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Photo from '../../models/photo';
import Album from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const getPhotos = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        const album_id = req.params.id;
        Photo.getPhotos(album_id)
            .then(async (result) => {
                const photoParsed = JSON.parse(JSON.stringify(result[0]));
                if (photoParsed.length) {
                    const photo_logo = photoParsed[0].photo_logo;
                    await Album.updateAlbum(photo_logo, album_id, person_id);
                }
                res.status(200).json({
                    data: result[0],
                    success: true,
                });
            })
            .catch((err) => {
                res.json({
                    error: {
                        message: (err as Error).message,
                    },
                    success: false,
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

export default getPhotos;
