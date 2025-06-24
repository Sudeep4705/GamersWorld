if(process.env.NODE_ENV != "production"){ //we are not using produuction phase
require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path =  require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const listingRouter = require("./routes/listing.js")
const reviewRouter   = require("./routes/review.js")
const Session = require("express-session");
const flash = require("connect-flash")
const passport = require("passport")
const Localstretagy = require("passport-local")
const User = require("./models/user.js");
const userRouter = require("./routes/user.js")



app.use(express.urlencoded({ extended: true })); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); 
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.use(express.static('public')); // if css is inside public/css

const sessionOptions = {
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
      cookie:{
        expires:Date.now()+ 7 * 24 * 60 * 60 *1000,
        maxAge:7 * 24 * 60 * 60 *1000,
        httpOnly:true     
    }

}
app.use(Session(sessionOptions))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstretagy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


main().then((req,res)=>{
    console.log("database connected");
})
.catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/gamers')
}

app.use((req,res,next)=>{
    res.locals.success = req.flash("success"); // sucess will store inside the locals in array structure
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;

    
    next()
})


// home route
app.get("/",(req,res)=>{
    res.render("listings/home.ejs")
})
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter)  // parent route
app.use("/",userRouter)



// middleware for error handling
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});


app.use((err,req,res,next)=>{
  let { statusCode=500,message="something wrong"} = err
//   console.log(err);
  
//   res.status(status).send(message)
res.status(statusCode).render("error.ejs",{err})
})

app.listen(8080,()=>{
    console.log("server started");
})