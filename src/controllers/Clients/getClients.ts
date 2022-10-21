/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Client from '../../models/clients';

import InfoRequest from '../../interface/albumsInterface';

const getClients = async (req: InfoRequest, res: Response) => {
    try {
        const admin_id = req.person.id as any;
        Client.getClients(admin_id).then((result) => {
            res.status(200).json({
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

export default getClients;
