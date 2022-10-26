import { RequestHandler } from 'express';

import Admin from '../../models/adminUsers';

const getAllUsers: RequestHandler = async (req, res) => {
    try {
        Admin.getAll().then((result) => {
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

export default getAllUsers;
