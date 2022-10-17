import e, { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const updateAlbum = async (req: InfoRequest, res: Response) => {
    try {
        const id = req.body.id;
        const person_id = req.person.id;
        const album = await Albums.getAlbumById(id, person_id);
        const updateAlbum = JSON.parse(JSON.stringify(album[0]));
        if (!updateAlbum.length) {
            res.status(404).json({ message: 'Album not found!' });
        } else {
            console.log(updateAlbum);
            const album_logo = req.body.album_logo ?? updateAlbum.album_logo;
            const album_name = req.body.album_name ?? updateAlbum.album_name;
            const album_location = req.body.album_location ?? updateAlbum.album_location;
            const date = new Date(req.body.date).toISOString();
            await Albums.updateAlbum(album_logo, album_name, album_location, date, id, person_id);
            res.status(200).json({ message: 'Updated!' });
        }
    } catch (err) {
        res.status(501).send((err as Error).message);
    }
};

export default updateAlbum;
