const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  currentDiscount: {
    type: String,
  },
  rating: {
    type: String,
  },
  genre: {
    type: String,
  },
  language: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: String,
    required: true,
  },
  ageGroup: {
    type: String,
  },
  typeOfBinding: {
    type: String,
    required: true,
  },
  isReturnable: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  numberOfPages: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("product", ProductSchema);
