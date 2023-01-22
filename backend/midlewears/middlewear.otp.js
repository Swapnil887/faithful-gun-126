const express = require("express");
const jwt = require("jsonwebtoken");
const { Usermodel, Loginotpmodel } = require("../models/model.users");

const mainProductRoute = express.Router()


const validate =async (req, res, next) => {
    const token = req.headers.authorization;
    try {

        if (token) {
            const resolve_token = jwt.verify(token, "masai");
            console.log(resolve_token)
            if (resolve_token.password=='Swapnil@123') {
                console.log("welcome admin")
                next()
            }

            else {
                await Loginotpmodel.deleteMany()
                res.json("you are not authorized")
            }
        }
        else {
            await Loginotpmodel.deleteMany()
            res.json("you are not authorized")
        }


    } catch (error) {
        console.log(error)
        res.send("something went wrong while admin want to get data in token side")
    }

}

module.exports = { validate }