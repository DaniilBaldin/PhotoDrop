/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const createAlbum = async (req: InfoRequest, res: Response) => {
    try {
        const { album_name, album_location } = req.body;
        const person_id = req.person.id;
        const date = new Date(req.body.date).toISOString();
        console.log(album_name, album_location, date, person_id);
        await Albums.saveAlbum(album_name, album_location, date, person_id);
        res.status(200).send('Saved!');
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default createAlbum;
