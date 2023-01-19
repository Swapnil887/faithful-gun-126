const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    "number":String,
    "email":String,
    "password":String,
    "otp":String
})

const Usermodel = mongoose.model("user",userSchema)


const otpSchema = mongoose.Schema({
    "otp":String,
    "number":String,
    "email":String
})
const Otpmodel = mongoose.model("otp",otpSchema)


const loginOtp = mongoose.Schema({
    "otp":String,
    "number":String,
    "email":String,
})

const Loginotpmodel = mongoose.model("login_otp",loginOtp)

module.exports = {Usermodel,Otpmodel,Loginotpmodel}