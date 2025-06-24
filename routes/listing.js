
const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const listingController = require("../controllers/listing.js")
const {isloggedin,isOwner,validateListing} = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer")
const storage = require("../Cloudconfig.js")
const upload = multer(storage)



router.route("/")//index route
.get(wrapAsync(listingController.index))
.post(isloggedin,validateListing,upload.single("listing[image]"),wrapAsync(listingController.create)) // create route

// new route
router.get("/new",isloggedin,(req,res)=>{
    res.render("listings/new.ejs")
})


router.route("/:id")// show route
.get(isloggedin,wrapAsync(listingController.show))
.put(isloggedin,isOwner,validateListing,upload.single("listing[image]"),wrapAsync( listingController.update)) // update route
.delete(isloggedin,isOwner,wrapAsync(listingController.delete))//delete route

// edit route
router.get("/:id/edit",isloggedin,isOwner,wrapAsync(listingController.edit));
router.post("/search",wrapAsync(listingController.search));

module.exports =router