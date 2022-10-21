import { Router } from 'express';
import bodyParser from 'body-parser';

import createAlbum from '../controllers/albums/createAlbum';
import getAlbums from '../controllers/albums/getAlbums';
import getAlbumById from '../controllers/albums/getAlbumById';

import authMiddleware from '../middleware/authMiddleware';

const albumRouter = Router();
albumRouter.use(bodyParser.json());

albumRouter.post('/album', authMiddleware, createAlbum);
albumRouter.get('/albums', authMiddleware, getAlbums);
albumRouter.get('/album/:id', authMiddleware, getAlbumById);

export default albumRouter;
