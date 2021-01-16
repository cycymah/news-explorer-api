const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: "Пользователь не найден" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(409).send({ message: "Пользователь уже существует" });
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        email,
        name,
        password: hash,
      })
    )
    .then((user) =>
      res.status(200).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      }
      return res.status(500).send({ message: "Ошибка сервера" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUser(email, password)
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: "Неправильные логин или пароль" });
      }
      const token = jwt.sign({ _id: user._id }, "key-secret", {
        expiresIn: "7d",
      });
      res.status(200).send({
        token,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send({ message: "Неправильные логин или пароль" });
    });
};
