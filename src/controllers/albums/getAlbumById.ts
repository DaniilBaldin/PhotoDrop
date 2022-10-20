/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';
const getAlbumById = async (req: InfoRequest, res: Response) => {
    try {
        const id = req.params.id as any;
        const person_id = req.person.id;
        const albumsById = await Albums.getAlbumById(id, person_id);
        // res.status(200).json(albumsById[0]);
        res.status(200).json({
            data: albumsById[0],
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

export default getAlbumById;
