import { Joi } from 'celebrate';

const createUser = Joi.object().keys({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});

export default {
  createUser,
};
