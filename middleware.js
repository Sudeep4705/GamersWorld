const Listing = require("./models/listing.js");
const Review = require("./models/review.js")
const ExpressError = require("./utils/expressError.js");
const { listingSchema } = require("./schema.js");
const {reviewSchema} = require("./schema.js");


// for listing
module.exports. validateListing = (req,res,next)=>{
    let {error}  =  listingSchema.validate(req.body)
    
    if(error){  
        let errMsg =error.details.map((el)=>el.message).join(",")
      throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};


    // for review
module.exports.validateReview = (req,res,next)=>{
    let {error}  =  reviewSchema.validate(req.body)
    
    if(error){
        let errMsg =error.details.map((el)=>el.message).join(",")
      throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};


module.exports.isloggedin=(req,res,next)=>
{
    if(!req.isAuthenticated()){  //it will check whether the userr login or not it is a passport method 
     req.session.redirectUrl = req.originalUrl; // if user is not logged in it store the originalUrl in session
        req.flash("error","you must login before creating a new player")
       return res.redirect("/login")
    }
    next();
}


module.exports.saveRedirecturl = (req,res,next)=>{  // we are creating this middlewrae bcz after the login passport will delete session info so we cant directly access the req.session.redirectUrl so we crate the another middleware it we store the path in res.locals.redirectUrl
if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl
}
next()
}


module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params
    let listing = await Listing.findById(id);
   if(!listing.owner.equals(res.locals.currUser._id)){ // we are checking whether currennt user is owner of this listing before the update
    req.flash("error","you are not a owner of this list")
   return res.redirect(`/listings/${id}`)
   }
   next();
}

module.exports.isAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params
    let review = await Review.findById(reviewId);
   if(!review.author.equals(res.locals.currUser._id)){ // we are checking whether currennt user is owner of this listing before the update
    req.flash("error","you are not the author of this review")
   return res.redirect(`/listings/${id}`)
   }
   next();
}