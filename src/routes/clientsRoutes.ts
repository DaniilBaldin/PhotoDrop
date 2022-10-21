import { Router } from 'express';
import bodyParser from 'body-parser';

import authMiddleware from '../middleware/authMiddleware';

import createClient from '../controllers/Clients/createClient';
import getClients from '../controllers/Clients/getClients';
import getClientById from '../controllers/Clients/getClientById';

const clientsRouter = Router();
clientsRouter.use(bodyParser.json());

clientsRouter.post('/client', authMiddleware, createClient);
clientsRouter.get('/client/:id', authMiddleware, getClientById);
clientsRouter.get('/clients', authMiddleware, getClients);

export default clientsRouter;
