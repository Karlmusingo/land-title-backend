import express from 'express';
import { celebrate } from 'celebrate';
import { TitleController } from '../../../controllers';
import { titleValidator } from './validators';
import { asyncHandler } from '../../../middlewares';
import Authentication from '../../../middlewares/authentication'


const router = express.Router();

router
  .route('/')
    .get(
      Authentication.verifyToken,
      asyncHandler(TitleController.getAll))
    .post(
      celebrate({ body: titleValidator.createTitle }),
      Authentication.verifyToken,
      asyncHandler(TitleController.create))

router.route('/search').get(asyncHandler(TitleController.searchTitle));

export default router;
