/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const deleteAlbumById = async (req: InfoRequest, res: Response) => {
    try {
        const id = req.params.id as any;
        const person_id = req.person.id;
        Albums.deleteAlbumById(id, person_id);
        // res.status(200).json('Deleted!');
        res.status(200).json({
            data: 'Deleted!',
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

export default deleteAlbumById;
