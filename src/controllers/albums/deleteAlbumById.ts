/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const deleteAlbumById = async (req: InfoRequest, res: Response) => {
    try {
        const id = req.params.id as any;
        const person_id = req.person.id;
        await Albums.deleteAlbumById(id, person_id);
        res.status(200).redirect('/');
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default deleteAlbumById;
