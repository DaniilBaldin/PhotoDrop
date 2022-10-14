/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const getAlbums = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        const albums = await Albums.getAlbums(person_id);
        res.status(200).send(albums[0]);
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default getAlbums;
