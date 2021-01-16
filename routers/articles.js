const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/Articles");

const standardJoiValidation = Joi.string().required();
const urlJoiValidation = Joi.string()
  .required()
  .pattern(/^(http|https):\/\/[^ "]+$/);

// Маршрут для карточек c новостями для получения
router.get("/articles", getArticles);

router.post(
  "/articles",
  celebrate({
    body: Joi.object().keys({
      keyword: standardJoiValidation,
      title: standardJoiValidation,
      text: standardJoiValidation,
      date: standardJoiValidation,
      source: standardJoiValidation,
      image: urlJoiValidation,
      link: urlJoiValidation,
    }),
  }),
  createArticle
);

router.delete(
  "/articles/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  deleteArticle
);

module.exports = router;
