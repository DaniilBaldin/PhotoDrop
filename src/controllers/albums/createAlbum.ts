/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const createAlbum = async (req: InfoRequest, res: Response) => {
    try {
        const { album_name, album_location } = req.body;
        const person_id = req.person.id as any;
        const date = new Date(req.body.date).toISOString();
        const album = await Albums.saveAlbum(album_name, album_location, date, person_id);
        const albumParsed = JSON.parse(JSON.stringify(album[0]));
        const id = albumParsed.insertId;
        Albums.getAlbumById(id, person_id).then((result) => {
            console.log(result[0]);
            // console.log(albumSaved);
            res.status(200).json({
                data: result[0],
                success: true,
            });
        });

        // console.log(albumSaved);
        // res.status(200).json({
        //     data: albumSaved[0],
        //     success: true,
        // });
    } catch (err) {
        res.json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default createAlbum;
