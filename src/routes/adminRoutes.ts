import { Router } from 'express';
import bodyParser from 'body-parser';

import createUser from '../controllers/adminUsers/createUser';
import loginUser from '../controllers/adminUsers/loginUser';

const adminRouter = Router();

adminRouter.post('/signup', createUser);
adminRouter.post('/login', loginUser);

adminRouter.use(bodyParser.json());

export default adminRouter;
