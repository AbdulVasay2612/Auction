const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  productType: String,
  endTime: Date,
  highestBid: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Auction", auctionSchema);
