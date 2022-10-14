/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';
const getAlbumById = async (req: InfoRequest, res: Response) => {
    try {
        const id = req.params.id;
        const person_id = req.person.id;
        const albumsById = await Albums.getAlbumById(id, person_id);
        res.status(200).send(albumsById[0]);
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default getAlbumById;
