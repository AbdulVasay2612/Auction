const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  username: String,
  amount: Number,
  auctionId: { type: mongoose.Schema.Types.ObjectId, ref: "Auction" },
});

module.exports = mongoose.model("Bid", bidSchema);
