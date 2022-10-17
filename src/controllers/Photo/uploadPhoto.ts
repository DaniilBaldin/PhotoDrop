/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import makeThumbnail from '../../services/thumbnailService';
import s3Upload from '../../services/s3Upload';

import Photo from '../../models/photo';

const uploadPhoto = async (req: any, res: Response) => {
    try {
        const image = req.body.file[0];
        const thumbnail = await makeThumbnail(image);
        // req.body.file.push(thumbnail);
        // console.log(req.body);
        // const result = await s3Upload(req.files);
        // const resultParsed = JSON.parse(JSON.stringify(result));

        // const { album_id } = req.body;
        // const photo_name = req.files[0].originalname;
        // const photo_url = resultParsed[0].url;
        // const photo_logo = resultParsed[1].url;
        // await Photo.saveAlbum(photo_logo, photo_name, photo_url, album_id);
        return res.json({ message: 'Saved!' });
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default uploadPhoto;
