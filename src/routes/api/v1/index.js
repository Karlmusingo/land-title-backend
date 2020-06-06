import express from 'express';
import titles from './title';
import users from './user';

const router = express.Router();

router.use('/titles', titles);
router.use('/users', users);


export default router;
