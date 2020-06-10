import { Joi } from 'celebrate';

const signUpUser = Joi.object().keys({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});

const signInUser = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});

export default {
  signInUser,
  signUpUser
};
