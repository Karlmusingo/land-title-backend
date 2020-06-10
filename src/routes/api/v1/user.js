import express from 'express';
import { celebrate } from 'celebrate';
import { UserController } from '../../../controllers';
import { asyncHandler } from '../../../middlewares';
import userValidator from './validators/userValidator';


const router = express.Router();

router
  
  .post('/signup',
    celebrate({ body: userValidator.signUpUser }),
    asyncHandler(UserController.signup)
  )
  .post('/signin',
    celebrate({ body: userValidator.signInUser }),
    asyncHandler(UserController.signin)
    )
 


export default router;
