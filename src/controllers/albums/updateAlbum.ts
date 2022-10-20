/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const updateAlbum = async (req: InfoRequest, res: Response) => {
    const id = req.body.id;
    const person_id = req.person.id;
    try {
        Albums.getAlbumById(id, person_id)
            .then((result) => {
                console.log(result[0]);
                const updateAlbum = JSON.parse(JSON.stringify(result[0]));
                const album_logo = req.body.album_logo || updateAlbum.album_logo || 'default';
                const album_name = req.body.album_name ?? updateAlbum.album_name;
                const album_location = req.body.album_location ?? updateAlbum.album_location;
                const date = new Date(req.body.date).toISOString();
                return [album_logo, album_name, album_location, date, id, person_id];
            })
            .then(async (result) => {
                await Albums.updateAlbum(result[0], result[1], result[2], result[3], result[4], result[5]);
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

export default updateAlbum;
