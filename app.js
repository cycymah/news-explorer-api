require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const cors = require('cors');
const mongoose = require('mongoose');
const { BD_DEV_HOST } = require('./utils/config');
const limiter = require('./middlewares/rateLimiter');

const combineRoutes = require('./routers/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centralErrors } = require('./middlewares/central-error');

const app = express();
const { PORT = 3000, BD_HOST, NODE_ENV } = process.env;

app.use(cors());
mongoose.connect(NODE_ENV === 'production' ? BD_HOST : BD_DEV_HOST, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);

app.use('/', combineRoutes);

app.use(errorLogger);
app.use(errors());

app.use(centralErrors);

app.listen(PORT);
