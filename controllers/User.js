const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  NOT_FOUND_USER, ALREADY_EXIST_USER, WRONG_LOGIN_DATA, EXPIRES_IN,
} = require('../utils/constants');
const { DEV_SECRET } = require('../utils/config');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER);
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(ALREADY_EXIST_USER);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUser(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(WRONG_LOGIN_DATA);
      }
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET, {
          expiresIn: EXPIRES_IN,
        });
      res.status(200).send({
        token,
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};
