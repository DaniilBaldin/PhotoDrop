import { RequestHandler } from 'express';

import Admin from '../../models/adminUsers';

const createUser: RequestHandler = async (req, res) => {
    try {
        const { login, password } = req.body;
        const dateCreated = new Date().toISOString();
        await Admin.save(login, password, dateCreated);
        res.status(201).send('Created!');
    } catch (err) {
        res.send((err as Error).message);
    }
};

export default createUser;
