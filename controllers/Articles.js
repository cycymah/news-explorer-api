const Articles = require('../models/articles');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { FORBIDDEN_MESSAGE, NOT_FOUND_ID_MESSAGE } = require('../utils/constants');

module.exports.getArticles = (req, res, next) => {
  Articles.find({ owner: req.user._id })
    .then((data) => {
      const dataWithoutOwner = data.map((article) => {
        const jsnArticle = article.toJSON();
        delete jsnArticle.owner;
        return jsnArticle;
      });
      res.status(200).send(dataWithoutOwner);
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const article = req.body;
  Articles.create({ ...article, owner: req.user._id })
    .then((articleData) => res.status(200).send(articleData))
    .catch(next);
};

// Удаляем Новость по id
module.exports.deleteArticle = (req, res, next) => {
  const { id } = req.params;

  Articles.findById({ _id: id })
    .orFail(new NotFoundError(NOT_FOUND_ID_MESSAGE))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_MESSAGE);
      }
      Articles.findByIdAndRemove({ _id: id })
        .then((cardInfo) => res.status(200).send(cardInfo))
        .catch(next);
    })
    .catch(next);
};
