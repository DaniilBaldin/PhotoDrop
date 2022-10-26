import { Router } from 'express';
import bodyParser from 'body-parser';

import authMiddleware from '../middleware/authMiddleware';

import createClient from '../controllers/Clients/createClient';
import getClients from '../controllers/Clients/getClients';
import getAllClients from '../controllers/Clients/getAllClients';

const clientsRouter = Router();
clientsRouter.use(bodyParser.json());

clientsRouter.post('/client', createClient);
clientsRouter.get('/allclients', getAllClients);
clientsRouter.get('/clients', authMiddleware, getClients);

export default clientsRouter;
