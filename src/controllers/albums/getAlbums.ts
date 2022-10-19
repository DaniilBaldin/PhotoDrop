/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const getAlbums = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        const albums = await Albums.getAlbums(person_id);
        // res.status(200).json(albums[0]);
        res.status(200).json({
            data: albums[0],
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

export default getAlbums;
