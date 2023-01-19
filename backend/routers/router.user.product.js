const express = require("express");
const mongoose = require("mongoose")
const {Productmodel,Cartmodel} = require("../models/model.products")
const jwt = require("jsonwebtoken");

const user_product_route = express.Router()

user_product_route.get("/homepage",async(req,res)=>{
    try {
        var data = await Productmodel.find()
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send("something went wrong while requesting home page")
    }
})

//cart;
//login=>token=>token_resolve=>userID=>

user_product_route.post("/cart",async (req,res)=>{
    const token = req.headers.authorization;
    const data = req.body;
    data.productID = data._id
    delete data._id 
    try {
        console.log(token)
        if(token)
        {
            const resolve_token = jwt.verify(token,"masai");
            console.log(resolve_token.number!=undefined)
            if(resolve_token.number!=undefined)
            {
                data.number = resolve_token.number
                var cart_data =new Cartmodel(data)
                await cart_data.save()
                res.send("data added into cart")
            }
            else{
                res.send("you have to login first")
            }
        }
        else{
            res.send("you have to login first")
        }
    } catch (error) {
        console.log(error);
        res.send("something went wrong while user want to add product in cart")
    }
})


//delete from cart
user_product_route.delete("/cart/:id",async (req,res)=>{
    const user_id = req.params.id

    try {
        await Cartmodel.deleteMany({_id:user_id})
        res.send("product remove from cart")
    } catch (error) {
        console.log(error)
        res.send("something went wrong while user want to delete data")
    }
})

module.exports = {user_product_route}