import { Router } from 'express';
import bodyParser from 'body-parser';

import getAlbums from '../controllers/albums/getAlbums';
import getAlbumById from '../controllers/albums/getAlbumById';
import deleteAlbumById from '../controllers/albums/deleteAlbumById';

import authMiddleware from '../middleware/authMiddleware';

const albumRouter = Router();
albumRouter.use(bodyParser.json());

albumRouter.post('/albums', authMiddleware, getAlbums);
albumRouter.post('/albums/:id', authMiddleware, getAlbumById);
albumRouter.delete('/albums/:id', authMiddleware, deleteAlbumById);

export default albumRouter;
