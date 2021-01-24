const router = require('express').Router();

const { getCurrentUser } = require('../controllers/User');

// Получаем пользователя
router.get('/users/me', getCurrentUser);

module.exports = router;
