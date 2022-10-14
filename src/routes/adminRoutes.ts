import { Router } from 'express';
import bodyParser from 'body-parser';

import createUser from '../controllers/adminUsers/createUser';
import authUser from '../controllers/adminUsers/authUser';
import loginUser from '../controllers/adminUsers/loginUser';

const adminRouter = Router();

adminRouter.post('/signup', createUser);
adminRouter.get('/auth', authUser);
adminRouter.post('/login', loginUser);

adminRouter.use(bodyParser.json());

export default adminRouter;
