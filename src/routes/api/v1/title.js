import express from 'express';
import { celebrate } from 'celebrate';
import { TitleController } from '../../../controllers';
import { titleValidator } from './validators';
import { asyncHandler } from '../../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(asyncHandler(TitleController.getAll))
  .post(
    celebrate({ body: titleValidator.createTitle }),
    asyncHandler(TitleController.create),
  );

// router.route('/today').get(asyncHandler(TicketController.getForToday));

export default router;
