const Articles = require("../models/articles");
const NotFoundError = require("../error/NotFoundError");

module.exports.getArticles = (req, res) => {
  Articles.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.message === "getFail") {
        return res.status(200).send([]);
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.createArticle = (req, res) => {
  const article = req.body;
  Articles.create({ ...article, owner: req.user._id })
    .then((articleData) => res.status(200).send(articleData))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      }
      return res.status(500).send({ message: "Ресурс недоступен" });
    });
};

// Удаляем Новость по id
module.exports.deleteArticle = (req, res, next) => {
  const { id } = req.params;

  Articles.findById({ _id: id })
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: "Нет карточки с таким id" });
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw res.status(403).send({ message: "Недостаточно прав" });
      }
      Articles.findByIdAndRemove({ _id: id })
        .then((cardInfo) => res.status(200).send(cardInfo))
        .catch(next);
    })
    .catch(next);
};
