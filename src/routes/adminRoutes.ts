import { Router } from 'express';
import bodyParser from 'body-parser';

import createUser from '../controllers/adminUsers/createUser';
import loginUser from '../controllers/adminUsers/loginUser';
import getAllUsers from '../controllers/adminUsers/getAllUsers';

const adminRouter = Router();

adminRouter.post('/signup', createUser);
adminRouter.post('/login', loginUser);
adminRouter.get('/allusers', getAllUsers);

adminRouter.use(bodyParser.json());

export default adminRouter;
