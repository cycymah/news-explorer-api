const combineRoutes = require('express').Router();
const articlesRouter = require('./articles');
const usersRouter = require('./user');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const crashServerTest = require('./crash-test');

const { autoriz } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError.js');
const { NOT_FOUND } = require('../utils/constants');

combineRoutes.use(crashServerTest);
combineRoutes.use(signupRouter);
combineRoutes.use(signinRouter);
combineRoutes.use(autoriz);
combineRoutes.use(usersRouter);
combineRoutes.use(articlesRouter);

combineRoutes.use(() => {
  throw new NotFoundError(NOT_FOUND);
});

module.exports = combineRoutes;
