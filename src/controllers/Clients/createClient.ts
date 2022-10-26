/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Client from '../../models/clients';

import InfoRequest from '../../interface/albumsInterface';

const createClient = async (req: InfoRequest, res: Response) => {
    try {
        const { client_name, phone_number, admin_id } = req.body;
        const selfie_image = 'none';
        Client.save(client_name, phone_number, admin_id, selfie_image).then((result) => {
            console.log(result[0]);
            res.status(201).json({
                data: result[0],
                success: true,
            });
        });
    } catch (err) {
        res.json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default createClient;
