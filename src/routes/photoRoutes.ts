import { Router } from 'express';
import bodyParser from 'body-parser';

import authMiddleware from '../middleware/authMiddleware';
import uploader from '../middleware/uploaderMiddleware';

import uploadPhoto from '../controllers/Photo/uploadPhoto';
import getPhotos from '../controllers/Photo/getPhotos';
import getPhotosByUser from '../controllers/Photo/getPhotosByUser';
import getPhotosById from '../controllers/Photo/getPhotosById';
import deletePhotosById from '../controllers/Photo/deletePhotoById';

const photoRouter = Router();
photoRouter.use(bodyParser.json());

photoRouter.post('/photo', authMiddleware, uploader.array('file'), uploadPhoto);
// photoRouter.post('/photos', authMiddleware, getPhotos);
// photoRouter.get('/photos/:id', authMiddleware, getPhotosById);
// photoRouter.delete('/photos/:id', authMiddleware, deletePhotosById);

export default photoRouter;
