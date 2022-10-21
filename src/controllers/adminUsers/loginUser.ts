import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import Admin from '../../models/adminUsers';
import generateJWT from '../../utils/generateJWT';

const loginUser: RequestHandler = async (req, res) => {
    const { login, password } = req.body;
    Admin.findUser(login)
        .then((user) => {
            const userParsed = JSON.parse(JSON.stringify(user[0]));
            console.log(userParsed[0]);
            if (!userParsed[0]) {
                res.status(404).json({
                    message: 'User not found!',
                    success: false,
                });
            }
            bcrypt
                .compare(password, userParsed[0].password)
                .then((result) => {
                    if (!result) {
                        console.log('Incorrect password!');
                        res.status(404).json({
                            message: 'Incorrect password!',
                            success: false,
                        });
                    } else {
                        console.log('Login successful!');
                        const token = generateJWT({ id: userParsed[0].id });
                        return res.json({
                            logged: true,
                            token,
                            user: {
                                person_id: userParsed[0].id,
                                login: userParsed[0].user,
                            },
                        });
                    }
                })
                .catch((err) => {
                    res.json({
                        error: {
                            message: (err as Error).message,
                        },
                        success: false,
                    });
                });
        })
        .catch((err) => {
            console.log('User not found!');
            res.json({
                error: {
                    message: 'User not found!',
                },
                success: false,
            });
        });
};

export default loginUser;
