const express = require("express");
const jwt  = require("jsonwebtoken");
const adminRouter = express.Router()


adminRouter.post("/login",async(req,res)=>{
    const admin = req.body;
    try {
        const name = admin.name;
        const password = admin.password;

        if(password=="Swapnil@123" && name=="swapnil")
        {const token = jwt.sign({"name":name,"password":password},"masai")
            console.log(token)
            res.send(token)
        }
        else{
            res.send("wrong credential")
        }
    } catch (error) {
        console.log(error);
        res.send("something went wrong while admin login")
    }
})


module.exports = {adminRouter}