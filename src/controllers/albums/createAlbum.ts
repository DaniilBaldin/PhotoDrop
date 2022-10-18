/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const createAlbum = async (req: InfoRequest, res: Response) => {
    try {
        const { album_name, album_location } = req.body;
        const person_id = req.person.id as any;
        const date = new Date(req.body.date).toISOString();
        await Albums.saveAlbum(album_name, album_location, date, person_id);
        const album = await Albums.getAlbum(person_id, album_name);
        console.log(album[0]);
        res.status(200).json(album[0]);
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default createAlbum;
