const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const validatorUrl = require('validator');

const validationFunction = (str) => validatorUrl.isURL(str);

const articlesSchema = new mongoose.Schema(
  {
    keyword: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true },
    source: { type: String, required: true },
    image: { type: String, required: true, validate: validationFunction },
    link: {
      type: String,
      required: true,
      validate: validationFunction,
    },
    owner: { type: ObjectId, required: true },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('article', articlesSchema);
