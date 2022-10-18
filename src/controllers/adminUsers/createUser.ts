import { RequestHandler } from 'express';

import Admin from '../../models/adminUsers';

const createUser: RequestHandler = async (req, res) => {
    try {
        const { login, password } = req.body;
        const dateCreated = new Date().toISOString();
        await Admin.save(login, password, dateCreated);
        res.status(201).json({
            message: 'User created!',
            success: true,
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

export default createUser;
