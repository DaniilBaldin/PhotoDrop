import { RequestHandler } from 'express';

import Admin from '../../models/adminUsers';
import generateJWT from '../../utils/generateJWT';

const loginUser: RequestHandler = async (req, res) => {
    try {
        const { login, password } = req.body;
        const result = await Admin.find(login, password);
        const person = JSON.parse(JSON.stringify(result[0]));
        console.log(person[0]);
        if (person[0] === undefined) {
            return res.status(404).json({ message: 'User not found. Invalid Login or password.' });
        }
        const token = generateJWT({ login });
        return res.json({
            token,
            user: {
                person_id: person[0].id,
                login: person[0].user,
            },
        });
    } catch (err) {
        res.send((err as Error).message);
    }
};

export default loginUser;
