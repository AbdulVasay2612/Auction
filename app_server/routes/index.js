const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auctionController");
const bidController = require("../controllers/bidController");
const reviewController = require("../controllers/reviewController");

// Home route
router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

// About page route
router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Auction routes
router.get("/auctions", auctionController.listAuctions);
router.get("/auctions/:id", auctionController.getAuctionDetails);
router.post("/auctions", auctionController.createAuction);

// Bid routes
router.get("/bids", bidController.listBids);
router.post("/bids/place/:auctionId", bidController.createBid);

// Review routes
router.get("/reviews", reviewController.listReviews);
router.post("/reviews", reviewController.createReview);

module.exports = router;
