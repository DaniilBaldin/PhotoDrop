import { Router } from 'express';
import bodyParser from 'body-parser';

import authMiddleware from '../middleware/authMiddleware';

import getAllClients from '../controllers/Clients/getAllClients';

const clientsRouter = Router();
clientsRouter.use(bodyParser.json());

clientsRouter.get('/clients', authMiddleware, getAllClients);

export default clientsRouter;
