const Auction = require("../models/Auction"); // Importing the Auction model

// List all auctions
exports.listAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.render("auctions", { title: "Auctions", auctions });
  } catch (error) {
    console.error("Error fetching auctions:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get auction details
exports.getAuctionDetails = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).send("Auction not found");
    }
    res.render("auction_details", { title: "Auction Details", auction });
  } catch (error) {
    console.error("Error fetching auction details:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Create a new auction
exports.createAuction = async (req, res) => {
  const { productName, productDescription, productType, endTime } = req.body;
  const newAuction = new Auction({
    productName,
    productDescription,
    productType,
    endTime,
  });

  try {
    await newAuction.save();
    res.redirect("/auctions");
  } catch (error) {
    console.error("Error creating auction:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Exporting functions correctly
module.exports = {
  listAuctions,
  getAuctionDetails,
  createAuction,
};
