const router = require('express').Router();
const { signupValidationSettings } = require('../utils/validation');

const { createUser } = require('../controllers/User');

router.post(
  '/signup',
  signupValidationSettings,
  createUser,
);

module.exports = router;
