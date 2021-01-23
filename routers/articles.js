const router = require('express').Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/Articles');
const { articleCreateValidationSettings, articleDeleteValidationSettings } = require('../utils/validation');

// Маршрут для карточек c новостями для получения
router.get('/articles', getArticles);

// Создать новость
router.post(
  '/articles', articleCreateValidationSettings,
  createArticle,
);

// Удаляем новость
router.delete(
  '/articles/:id',
  articleDeleteValidationSettings,
  deleteArticle,
);

module.exports = router;
