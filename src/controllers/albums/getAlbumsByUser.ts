/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Metadata from '../../models/metadata';

import InfoRequest from '../../interface/albumsInterface';

const getAlbumsByUser = async (req: InfoRequest, res: Response) => {
    try {
        const person = <any>req.body.user;
        const albums = await Metadata.getAlbumsByUser(person);
        res.status(200).send(albums[0]);
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default getAlbumsByUser;
