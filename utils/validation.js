const validator = require('validator');
const { celebrate, Joi, CelebrateError } = require('celebrate');

const validationUrlErr = (v) => {
  if (!validator.isURL(v)) {
    throw new CelebrateError();
  }
  return v;
};

const JOI_STRING_REQ_VALID = Joi.string().required();
const JOI_URL_VALID = Joi.string()
  .required()
  .custom(validationUrlErr);

module.exports.signinValidationSettings = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.signupValidationSettings = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.articleCreateValidationSettings = celebrate({
  body: Joi.object().keys({
    keyword: JOI_STRING_REQ_VALID,
    title: JOI_STRING_REQ_VALID,
    text: JOI_STRING_REQ_VALID,
    date: JOI_STRING_REQ_VALID,
    source: JOI_STRING_REQ_VALID,
    image: JOI_URL_VALID,
    link: JOI_URL_VALID,
  }),
});

module.exports.articleDeleteValidationSettings = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});
