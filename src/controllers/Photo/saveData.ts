import { RequestHandler } from 'express';
import crypto from 'crypto';
import Metadata from '../../models/metadata';

const saveData: RequestHandler = (req, res) => {
    const cookies = JSON.parse(req.cookies.data);
    console.log(cookies);
    const id = crypto.randomUUID();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cookies.forEach(async (e: any) => {
        const photo_id = crypto.randomUUID();
        const album_id = id;
        const album_user = e.user;
        const photo_url = e.photo_url;
        const dateCreated = e.date;
        const metadata = new Metadata(photo_id, album_id, album_user, photo_url, dateCreated);
        await metadata.save();
    });
    res.redirect('/upload');
};

export default saveData;
