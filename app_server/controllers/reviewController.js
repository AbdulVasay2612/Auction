const Review = require("../models/Review");

// List reviews
exports.listReviews = async (req, res) => {
  try {
    // Fetch the latest reviews and sort by creation date
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(3);
    res.render("reviews", { title: "Reviews", reviews });
  } catch (error) {
    console.error("Error loading reviews:", error);
    res.status(500).send("Error loading reviews");
  }
};

// Create a new review
exports.createReview = async (req, res) => {
  try {
    // Create a new review instance
    const newReview = new Review({
      username: req.body.username,
      comment: req.body.comment,
    });
    await newReview.save(); // Save the review to the database
    res.redirect("/reviews"); // Redirect to the reviews page
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).send("Error adding review");
  }
};

// Export the functions
module.exports = {
  listReviews,
  createReview,
};
