const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const {saveRedirecturl} = require("../middleware.js")
const wrapAsync = require("../utils/wrapAsync.js")
const userController=require("../controllers/user.js")

router.route("/signup")
.get(userController.signupRender)
.post(wrapAsync(userController.signup))

router.route("/login")
.get(userController.loginRender)
.post(saveRedirecturl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),userController.login)




router.get("/logout",userController.logout)








module.exports =router;