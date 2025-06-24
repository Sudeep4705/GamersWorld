const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const gamersSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
       url:String,
       filename:String
    },
    gamename:{
        type:String,
        required:true
    },
    location:{
        type:String,
        requied:true
    },

   networth:{
    type:Number,
    required:true
},
Rating:[{
     type:Schema.Types.ObjectId,
        ref:"Review"

}],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
   geometry:{
      type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }

    }

})


gamersSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
await Review.deleteMany({_id:{$in:listing.Rating}})
    }
})

const Listing = mongoose.model("Listing",gamersSchema);
module.exports = Listing;


