/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import Metadata from '../../models/metadata';

const getAlbumById: RequestHandler = async (req, res) => {
    try {
        const id = <any>req.params.id;
        console.log(id);
        const albumsById = await Metadata.getAlbumById(id);
        res.status(200).send(albumsById[0]);
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default getAlbumById;
