/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import Metadata from '../../models/metadata';

const getPhotos: RequestHandler = async (req, res) => {
    try {
        const person = <any>req.body.user;
        const photoResult = await Metadata.getPhotos(person);
        res.status(200).send(photoResult[0]);
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default getPhotos;
