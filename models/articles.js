const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const validatorUrl = require('validator');
const { WRONG_URL } = require('../utils/constants');

const articlesSchema = new mongoose.Schema(
  {
    keyword: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true },
    source: { type: String, required: true },
    image: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return validatorUrl.isURL(v);
        },
        message: WRONG_URL,
      },
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return validatorUrl.isURL(v);
        },
        message: WRONG_URL,
      },

    },
    // select не работает
    owner: { type: ObjectId, select: false, required: true },
  },
  {
    versionKey: false,
  },
);

// Вносим изменения чтобы убрать owner
articlesSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.owner;
  return obj;
};

module.exports = mongoose.model('article', articlesSchema);
