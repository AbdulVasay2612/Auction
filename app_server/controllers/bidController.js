const Bid = require("../models/Bid");
const Auction = require("../models/Auction");

// List all bids
exports.listBids = async (req, res) => {
  try {
    // Fetch bids and populate the auction details
    const bids = await Bid.find().populate("auctionId", "productName");
    const auctions = await Auction.find();
    res.render("bids", { title: "Bids", bids, auctions });
  } catch (error) {
    console.error("Error loading bids:", error);
    res.status(500).send("Error loading bids");
  }
};

// Create a new bid
exports.createBid = async (req, res) => {
  try {
    const auctionId = req.params.auctionId; // Get auction ID from the URL parameters
    const { username, amount } = req.body; // Extract username and bid amount from request body

    // Check if the auction exists
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).send("Auction not found");
    }

    // Create and save the new bid
    const newBid = new Bid({
      username,
      amount,
      auctionId,
    });
    await newBid.save();

    // Update the highest bid on the auction (optional but recommended)
    auction.highestBid = Math.max(auction.highestBid || 0, amount);
    await auction.save();

    // Redirect to the auction details page
    res.redirect(`/auctions/${auctionId}`);
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).send("Error placing bid");
  }
};

// Export the functions
module.exports = {
  listBids,
  createBid,
};
