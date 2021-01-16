const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 30,
      default: "NewUser",
    },
    password: {
      type: String,
      min: 8,
      unique: true,
      required: true,
      select: false,
    },
    email: {
      type: String,
      validate: {
        validator(v) {
          return isEmail(v);
        },
        message: "Ошибка валидации email",
      },
      min: 5,
      max: 30,
      unique: true,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

// eslint-disable-next-line func-names
userSchema.statics.findUser = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }
        return user;
      });
    });
};
module.exports = mongoose.model("user", userSchema);
