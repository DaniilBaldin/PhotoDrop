import { RequestHandler } from 'express';

import Admin from '../../models/adminUsers';

const createUser: RequestHandler = async (req, res) => {
    try {
        const { login, password } = req.body;
        const dateCreated = new Date().toISOString();
        const user = new Admin(login, password, dateCreated);
        await user.save();
    } catch (err) {
        res.send((err as Error).message);
    }
};

export default createUser;
