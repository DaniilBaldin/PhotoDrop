import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import Admin from '../../models/adminUsers';

const createUser: RequestHandler = async (req, res) => {
    const { login, password } = req.body;
    Admin.findUser(login)
        .then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            // console.log(resultParsed);
            if (!resultParsed.length) {
                const hashedPassword = await bcrypt.hash(password, 12);
                const dateCreated = new Date().toISOString();
                await Admin.save(login, hashedPassword, dateCreated);
                res.status(201).json({
                    message: 'User created!',
                    success: true,
                });
            } else if (resultParsed[0].user === login) {
                res.status(401).json({
                    message: 'User already exists!',
                    success: false,
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });

    // try {
    //     const { login, password } = req.body;
    //     const user = await Admin.findUser(login);
    //     console.log(user[0]);

    //     const userParsed = JSON.parse(JSON.stringify(user[0]));
    //     console.log([userParsed[0].user, login]);
    // if (userParsed[0].user !== login) {
    //     res.status(201).json({
    //         message: 'User created!',
    //         success: false,
    //     });
    // } else if (userParsed[0].user === undefined) {
    //     return res.status(401).json({
    //         message: 'User already exists!',
    //         success: false,
    //     });
    // }

    // await Admin.findUser(login)
    //     .then((result) => {
    //         if (result === login) {
    //
    //         } else {
    //             return result;
    //         }
    //     })
    //     .then(async (result) => {
    //
    // const dateCreated = new Date().toISOString();
    // console.log(dateCreated);
    // const hashedPassword = await bcrypt.hash(password, 12);
    // console.log(hashedPassword);
    // });r

    // await Admin.save(login, password, dateCreated);
    // res.status(201).json({
    //     message: 'User created!',
    //     success: true,
    // });
    //     } catch (err) {
    //         res.json({
    //             error: {
    //                 message: 'User ',
    //             },
    //             success: false,
    //         });
    //     }
};

export default createUser;
