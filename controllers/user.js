const User = require("../models/user");

module.exports.signupRender = async(req,res)=>{
    res.render("users/signup.ejs")
}


module.exports.signup = async(req,res)=>{
try{
    let{email,username,password} = req.body
    const newuser =  new User({
         email,
         username
     })
  const reguser = await User.register(newuser,password)

  req.login(reguser,(err)=>{ // here im using login method for automatitcally login after signup it store the userr info in session also
    if(err){
        return next(err)
    }
      req.flash("success","Registered Successfully")
  res.redirect("/")
  })

}
catch(e){
    req.flash("error",e.message)
    res.redirect("/signup")
}
  
}


module.exports.loginRender = async(req,res)=>{
    res.render("users/login.ejs")
}


module.exports.login = async(req,res)=>{
req.flash("success","welcome to GamersWorld");
let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl ) 
}


module.exports.logout = (req,res)=>{
    req.logOut((err)=>{
        if(err){
           return next(err)
        }
        else{
            req.flash("success","You logged out successfully");
            res.redirect("/")
        }
    })
}