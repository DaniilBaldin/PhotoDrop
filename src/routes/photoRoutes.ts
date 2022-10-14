import { Router } from 'express';
import bodyParser from 'body-parser';

import authMiddleware from '../middleware/authMiddleware';

import sendHTML from '../controllers/Photo/sendHTML';
import saveData from '../controllers/Photo/saveData';
import getPhotos from '../controllers/Photo/getPhotos';
import getPhotosByUser from '../controllers/Photo/getPhotosByUser';
import getPhotosById from '../controllers/Photo/getPhotosById';
import deletePhotosById from '../controllers/Photo/deletePhotoById';

const photoRouter = Router();
photoRouter.use(bodyParser.json());

photoRouter.get('/upload', sendHTML);
photoRouter.get('/save', saveData);
photoRouter.get('/photos', authMiddleware, getPhotos);
photoRouter.post('/photo', authMiddleware, getPhotosByUser);
photoRouter.get('/photos/:id', authMiddleware, getPhotosById);
photoRouter.delete('/photos/:id', authMiddleware, deletePhotosById);

export default photoRouter;
