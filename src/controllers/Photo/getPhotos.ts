/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Photo from '../../models/photo';
import Album from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const getPhotos = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        const album_id = req.params.id;
        const photo = await Photo.getPhotos(album_id);
        const photoParsed = JSON.parse(JSON.stringify(photo[0]));
        const photo_logo = photoParsed[0].photo_logo;
        console.log(photo_logo);
        await Album.updateAlbum(photo_logo, album_id, person_id);
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
