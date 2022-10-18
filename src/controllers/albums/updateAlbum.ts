import { Response } from 'express';
import Albums from '../../models/albums';

import InfoRequest from '../../interface/albumsInterface';

const updateAlbum = async (req: InfoRequest, res: Response) => {
    try {
        const id = req.body.id;
        const person_id = req.person.id;
        console.log(id, person_id);
        const album = await Albums.getAlbumById(id, person_id);
        console.log(album[0]);
        const updateAlbum = JSON.parse(JSON.stringify(album[0]));
        console.log(updateAlbum);
        if (!updateAlbum.length) {
            res.status(404).json({ message: 'Album not found!' });
        } else {
            // console.log(updateAlbum);
            const album_logo = req.body.album_logo || updateAlbum.album_logo || 'default';
            const album_name = req.body.album_name ?? updateAlbum.album_name;
            const album_location = req.body.album_location ?? updateAlbum.album_location;
            const date = new Date(req.body.date).toISOString();
            console.log(album_logo, album_location, album_name, date);
            Albums.updateAlbum(album_logo, album_name, album_location, date, id, person_id);
            const albumUpd = await Albums.getAlbum(person_id, album_name);
            res.status(200).json({
                data: albumUpd[0],
                success: true,
            });
        }
    } catch (err) {
        res.json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default updateAlbum;
