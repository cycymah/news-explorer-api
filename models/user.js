const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { WRONG_LOGIN_DATA, WRONG_EMAIL } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      require: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
      select: false,
    },
    email: {
      type: String,
      validate: {
        validator(v) {
          return isEmail(v);
        },
        message: WRONG_EMAIL,
      },
      min: 5,
      unique: true,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUser = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(WRONG_LOGIN_DATA);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(WRONG_LOGIN_DATA);
        }
        return user;
      });
    });
};
module.exports = mongoose.model('user', userSchema);
