const router = require('express').Router();
const { login } = require('../controllers/User');
const { signinValidationSettings } = require('../utils/validation');

router.post(
  '/signin',
  signinValidationSettings,
  login,
);

module.exports = router;
