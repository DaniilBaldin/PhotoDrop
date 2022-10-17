/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import Metadata from '../../models/photo';

const getPhotos: RequestHandler = async (req, res) => {
    try {
        const photoResult = await Metadata.getPhotos();
        res.status(200).send(photoResult[0]);
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default getPhotos;
