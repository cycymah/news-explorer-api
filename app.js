require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const cors = require('cors');
const mongoose = require('mongoose');
const { DB_DEV_HOST } = require('./utils/config');
const { autoriz } = require('./middlewares/auth');
const limiter = require('./middlewares/rateLimiter');
const NotFoundError = require('./errors/NotFoundError.js');
const { login, createUser } = require('./controllers/User');
const combineRoutes = require('./routers/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centralErrors } = require('./middlewares/central-error');
const { NOT_FOUND } = require('./utils/constants');

const app = express();
const { PORT = 3000, DB_HOST, NODE_ENV } = process.env;

app.use(cors());
mongoose.connect(NODE_ENV === 'production' ? DB_HOST : DB_DEV_HOST, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

app.use(autoriz);

app.use('/', combineRoutes);

app.use(() => {
  throw new NotFoundError(NOT_FOUND);
});

app.use(errorLogger);
app.use(errors());

app.use(centralErrors);

app.listen(PORT, () => { console.log('Работает на порту ', PORT); });
