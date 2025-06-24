const Review = require("../models/review");
const Listing = require("../models/listing")

module.exports.Add = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    const newReview = new Review(req.body.review);
     newReview.author = req.user._id
    await newReview.save();
  

    listing.Rating.push(newReview);
    await listing.save();
  req.flash("success"," New Review Created")
    res.redirect(`/listings/${listing._id}`);
}


module.exports.delete = async(req,res)=>{
let {id,reviewId} = req.params;
await Listing.findByIdAndUpdate(id,{$pull: {Rating:reviewId}});
await Review.findByIdAndDelete(reviewId)
   req.flash("success"," Review is Deleted")
   res.redirect(`/listings/${id}`);
}