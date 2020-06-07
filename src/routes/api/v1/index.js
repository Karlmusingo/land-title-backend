import express from 'express';
import titles from './title';
import users from './user';

const router = express.Router();

router.use('/titles', titles);
router.use('/auth/users', users);


export default router;
