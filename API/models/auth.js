const mongoose = require("mongoose");

//model oluşturduk.
const AuthSchema = new mongoose.Schema({
  username: {
    type: String, //veri tipi
    required: true, // gereklilik
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // benzersiz olmalı
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

//dışarıya export ediyoruz
module.exports = mongoose.model("auth", AuthSchema);
