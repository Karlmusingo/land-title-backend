import { Joi } from 'celebrate';

const createTitle = Joi.object().keys({
  title: Joi.string().trim().required(),
  squareMeter: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  mortgage: Joi.string().trim().required(),
});

export default {
  createTitle,
};
