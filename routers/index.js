const combineRoutes = require('express').Router();
const articlesRouter = require('./articles');
const usersRouter = require('./user');

combineRoutes.use(usersRouter);
combineRoutes.use(articlesRouter);

module.exports = combineRoutes;
