import express from 'express';
import { celebrate } from 'celebrate';
import { TitleController } from '../../../controllers';
import { titleValidator } from './validators';
import { asyncHandler } from '../../../middlewares';
import Authentication from '../../../middlewares/authentication';

const router = express.Router();

router
  .route('/')
  .get(asyncHandler(TitleController.getAll))
  .post(
    celebrate({ body: titleValidator.createTitle }),
    Authentication.verifyToken,
    asyncHandler(TitleController.create),
  );

router.route('/search').get(asyncHandler(TitleController.searchTitle));
router
  .route('/:id/transactions')
  .post(
    celebrate({ body: titleValidator.createTitle }),
    Authentication.verifyToken,
    asyncHandler(TitleController.createTransaction),
  )
  .get(asyncHandler(TitleController.getAllTransactions));

export default router;
