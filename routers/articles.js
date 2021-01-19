const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/Articles');
const { URL_REGEXP } = require('../utils/constants');

const JOI_STRING_REQ_VALID = Joi.string().required();
const JOI_URL_VALID = Joi.string()
  .required()
  .pattern(URL_REGEXP);

// Маршрут для карточек c новостями для получения
router.get('/articles', getArticles);

// Создать новость
router.post(
  '/articles',
  celebrate({
    body: Joi.object().keys({
      keyword: JOI_STRING_REQ_VALID,
      title: JOI_STRING_REQ_VALID,
      text: JOI_STRING_REQ_VALID,
      date: JOI_STRING_REQ_VALID,
      source: JOI_STRING_REQ_VALID,
      image: JOI_URL_VALID,
      link: JOI_URL_VALID,
    }),
  }),
  createArticle,
);

router.delete(
  '/articles/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  deleteArticle,
);

module.exports = router;
