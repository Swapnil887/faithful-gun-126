const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const otpGenerator = require('otp-generator')
const {Otpmodel,Loginotpmodel,Usermodel} = require("../models/model.users")
const user_route = express.Router()

user_route.post("/register",async(req,res)=>{
    const user_data = req.body;
    try {
        var data =await Usermodel.find({number:user_data.number})
        if(data.length>0)
        {res.send("number already register")}
        else if(user_data.password==undefined && user_data.number==undefined)
        {
            res.send("please fill details")
        }
        else if(user_data.password==undefined)
        {
           const otp =  otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false })
           user_data.otp = otp;
           const OTP =new Otpmodel(user_data)
           await OTP.save()
           res.send(otp)
        }
        else if(user_data.password!=undefined && user_data.number!=undefined && user_data.email!=undefined){
            var data = new Usermodel(req.body)
            await data.save()
        res.send("register by password")
        }
        else{
            res.send("number is mendatory")
        }
    } catch (error) {
        console.log(error)
        res.send("something went wrong while register")
    }
})

user_route.post("/register/:otp",async(req,res)=>{
    var user_otp = req.params.otp;
    console.log(user_otp)

    try {
        var data_otp = await Otpmodel.find()
        console.log(data_otp)
        if(data_otp.length==0)
        {
            res.send("you have to register first")
        }

       else if(data_otp[0].otp===user_otp)
       {
        const number = data_otp[0].number;
        const email = data_otp[0].email
        var data =new Usermodel({"number":number,"email":email})
        await data.save()
        await Otpmodel.deleteMany()
        res.send("register")
        
       }
       else{
        console.log("wrong otp")
        res.send("wrong otp")
       }

    } catch (error) {
        console.log(error)
        res.send("something went wrong while otp check")
    }
})

//login;

user_route.post("/login",async (req,res)=>{
   const user_data =req.body;
   console.log(user_data)
    try {
        var data = await Usermodel.find({number:user_data.number})
        if(data.length>0)
        {   
            const otp =  otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false })
            var x = data[0]
            x.otp = otp;
            console.log(data[0])
            var a = new  Loginotpmodel({"number":x.number,"otp":x.otp})
            a.save()
            res.send(a)
        }
        else{
            res.send("You have to register first")
        }
        

    } catch (error) {
        
    }
})

user_route.post("/login/:id",async(req,res)=>{
    try {
        
        var data = await Loginotpmodel.find()
        console.log(data,req.params.id)
        if(req.params.id==data[0].otp)
        {
            var token = jwt.sign(data[0].number,"masai")
            console.log(token)
            await Loginotpmodel.deleteMany()
            res.send(`login successfull token:${token}`)
        }
        else{
            res.send("wrong otp")
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = {user_route}