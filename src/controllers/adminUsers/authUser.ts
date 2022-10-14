import { Response } from 'express';

import Admin from '../../models/adminUsers';
import generateJWT from '../../utils/generateJWT';

import InfoRequest from '../../interface/albumsInterface';

const authUser = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        const result = await Admin.findOne(person_id);
        console.log(result);
        // const person = JSON.parse(JSON.stringify(result[0]));
        // if (person[0] === undefined) {
        //     return res.status(404).json({ logged: false, message: 'User not found. Invalid Login or Password.' });
        // }
        // const token = generateJWT({ id: person[0].id });
        // console.log();
        // return res.json({
        //     logged: true,
        //     token,
        //     user: {
        //         person_id: person[0].id,
        //         login: person[0].user,
        //     },
        // });
    } catch (err) {
        res.send((err as Error).message);
    }
};

export default authUser;
