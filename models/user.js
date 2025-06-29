const { string, required } = require("joi");
const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const UserSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    
})

UserSchema.plugin(passportLocalMongoose);

const User  = mongoose.model("User",UserSchema);

module.exports = User;