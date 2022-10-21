/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Client from '../../models/clients';

import InfoRequest from '../../interface/albumsInterface';

const createClient = async (req: InfoRequest, res: Response) => {
    try {
        const { client_name, phone_number } = req.body;
        const album_id = req.person.id as any;
        Client.getClientByNumber(phone_number).then((result) => {
            const resultParsed = JSON.parse(JSON.stringify(result));
            const user = {
                client_name: client_name,
                phone_number: phone_number,
            };
            switch (true) {
                case resultParsed[0].length === 0:
                    Client.save(client_name, phone_number, album_id).then(() => {
                        res.status(201).json({
                            data: user,
                            success: true,
                        });
                    });
                    break;
                default:
                    res.status(401).json({
                        message: 'User already exists!',
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

export default createClient;
