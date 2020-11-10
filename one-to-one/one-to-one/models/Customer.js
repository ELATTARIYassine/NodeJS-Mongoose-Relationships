const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
  })
);

module.exports = Customer;
