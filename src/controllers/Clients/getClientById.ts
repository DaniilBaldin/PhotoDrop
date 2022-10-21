/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Client from '../../models/clients';

import InfoRequest from '../../interface/albumsInterface';

const getClientById = async (req: InfoRequest, res: Response) => {
    try {
        const id = req.params.id;
        Client.getClientById(id).then((result) => {
            const resultParsed = JSON.parse(JSON.stringify(result));
            switch (true) {
                case resultParsed[0].length === 1:
                    res.status(200).json({
                        data: resultParsed[0],
                        success: true,
                    });
                    break;
                default:
                    res.status(404).json({
                        message: 'User not found!',
                        success: false,
                    });
                    break;
            }
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

export default getClientById;
