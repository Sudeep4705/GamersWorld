const Listing = require("../models/listing")
const mbxGecoding = require('@mapbox/mapbox-sdk/services/geocoding'); // im changing the titles style to geocoding
const maptoken = process.env.MAP_TOKEN;
const geocodingClient = mbxGecoding({ accessToken:maptoken });


module.exports.index=async(req,res)=>{
let listing = await Listing.find();
res.render("listings/index.ejs",{listing})
}

module.exports.show=async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path:"Rating",populate:{path:"author"}}).populate("owner");
     
    res.render("listings/show.ejs",{listing})
    }

module.exports.create=async(req,res)=>{
     let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location, //it convert the headquarters to coordinates
    
    
    limit: 1
  })
 
  
    .send();
     
let url = req.file.path;
let filename = req.file.filename
let listing =  new Listing(req.body.listing)
listing.owner = req.user._id; 
listing.image={url,filename}
 listing.geometry=response.body.features[0].geometry // in here im storing the coordinates in listing.geometry on listing schema
await listing.save();
req.flash("success","New Player Added");
res.redirect("/listings")
}


module.exports.edit=async(req,res)=>{
    let {id} = req.params;
    let listing =  await Listing.findById(id)
    if(!listing){
        req.flash("error","Player you requested does not exist");
    }
    res.render("listings/edit.ejs",{listing})
}

module.exports.update=async(req,res)=>{
    let {id} = req.params;
    let lists = await Listing.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file !=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;  
    lists.image={url,filename}
    await lists.save()
    }
    req.flash("success","Player is updated")
    res.redirect("/listings")
}

module.exports.delete =async(req,res)=>{
    let {id} = req.params;
let deldata = await Listing.findByIdAndDelete(id)
req.flash("success","Player is deleted")
res.redirect("/listings")
}


// module.exports.search = async(req,res)=>{
//     
// let data = req.body.search;
//      let {searchdata} = await Listing.findOne({Name:data})
     
     
//      res.render("listings/search.ejs",{searchdata})
//     }

    

module.exports.search = async (req, res) => {
  try {
    let data = req.body.search;
    let searchdata = await Listing.findOne({ Name: data });  // no destructuring

    res.render("listings/search.ejs", { searchdata });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
   


    
    
    
    
    
    
