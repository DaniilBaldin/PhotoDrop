/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Client from '../../models/clients';

import InfoRequest from '../../interface/albumsInterface';

const getAllClients = async (req: InfoRequest, res: Response) => {
    try {
        Client.getAllClients().then((result) => {
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

export default getAllClients;
