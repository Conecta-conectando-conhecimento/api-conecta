import { Router } from 'express';

import AuthRouter from './auth';
import AuthorRouter from './author';
import BookRouter from './book';
import GenreRouter from './genre';
import { Middleware } from './middleware';
import UserRouter from './user';

const router = Router();

const middleware = new Middleware();

router.use('/auth', AuthRouter);
router.use('/book', middleware.auth, BookRouter);
router.use('/author', middleware.auth, AuthorRouter);
router.use('/user', middleware.auth, UserRouter);
router.use('/genre', middleware.auth, GenreRouter);

export default router;