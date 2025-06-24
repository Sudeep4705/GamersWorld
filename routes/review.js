const express = require("express");
const router = express.Router({mergeParams:true});
const reviewController = require("../controllers/review.js")
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const {isAuthor,isloggedin,validateReview} = require("../middleware.js");




// review Schema
// add review
router.post("/", validateReview,wrapAsync(reviewController.Add));

// delete review
router.delete("/:reviewId",isloggedin,isAuthor,wrapAsync(reviewController.delete))

module.exports = router