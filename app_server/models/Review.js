const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: String,
  comment: String,
});

module.exports = mongoose.model("Review", reviewSchema);
