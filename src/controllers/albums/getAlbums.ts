/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Metadata from '../../models/metadata';

import InfoRequest from '../../interface/albumsInterface';

const getAlbums = async (req: InfoRequest, res: Response) => {
    try {
        const person = <any>req.body.user;
        console.log(person);
        const albums = await Metadata.getAlbum(person);
        res.status(200).send(albums[0]);
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default getAlbums;
