import { Router } from 'express';
import bodyParser from 'body-parser';

import authMiddleware from '../middleware/authMiddleware';

const clientsRouter = Router();
clientsRouter.use(bodyParser.json());

// clientsRouter.post('/client', authMiddleware, uploadPhoto);
// clientsRouter.get('/client/:id', authMiddleware, getPhotos);
// clientsRouter.get('/client', authMiddleware, getPhotosById);

export default clientsRouter;
