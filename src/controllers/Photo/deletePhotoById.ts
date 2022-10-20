/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import Photo from '../../models/photo';

const deletePhotoById: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id;
        await Photo.deletePhotoById(id);
        // res.status(200).json('deleted!');
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

export default deletePhotoById;
