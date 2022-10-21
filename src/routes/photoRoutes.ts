import { Router } from 'express';
import bodyParser from 'body-parser';

import authMiddleware from '../middleware/authMiddleware';
import uploader from '../middleware/uploaderMiddleware';

import uploadPhoto from '../controllers/Photo/uploadPhoto';
import uploadPhotos from '../controllers/Photo/uploadPhotos';
import getPhotos from '../controllers/Photo/getPhotos';
import getPhotosById from '../controllers/Photo/getPhotosById';

const photoRouter = Router();
photoRouter.use(bodyParser.json());

photoRouter.post('/photo', authMiddleware, uploader.array('file'), uploadPhoto);
photoRouter.post('/photos', authMiddleware, uploader.array('file'), uploadPhotos);
photoRouter.get('/photos/:id', authMiddleware, getPhotos);
photoRouter.get('/photo', authMiddleware, getPhotosById);

export default photoRouter;
