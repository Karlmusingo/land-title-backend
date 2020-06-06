import express from 'express';
import { celebrate } from 'celebrate';
import { UserController } from '../../../controllers';
import { asyncHandler } from '../../../middlewares';
import userValidator from './validators/userValidator';

const router = express.Router();

router
  .route('/')
  .get(asyncHandler(UserController.getAll))
  .post(
    celebrate({ body: userValidator.createUser }),
    asyncHandler(UserController.create),
  );


export default router;
