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

user_product_route.get("/cart",async (req,res)=>{
    const token = req.headers.authorization;
    const resolve_token = jwt.verify(token,"masai")
    try {
        const cart_data = await Cartmodel.find({number:resolve_token})
        res.send(cart_data)
    } catch (error) {
        console.log(error);
        res.send("something went wrong while use want to get data in cart")
    }
  
})


user_product_route.post("/cart",async (req,res)=>{
    const cartdata = await Cartmodel.find()
    const token = req.headers.authorization;
    const data = req.body;
    data.productID = data._id
    delete data._id 
    try {
        console.log(token)
        if(token)
        {
            const resolve_token = jwt.verify(token,"masai");
            data.number = resolve_token;
            
            if(resolve_token!=undefined)
            {   console.log(data)
                // data.number = resolve_token.number
                var cart_data =new Cartmodel(data)
                await cart_data.save()
                const final_data = await Cartmodel.find({number:resolve_token})
                        res.send(final_data)
                
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

user_product_route.delete("/cart/:id",async (req,res)=>{
    const user_id = req.params.id
    const token = req.headers.authorization
    const resolve_token = jwt.verify(token,"masai");
    const data =await Cartmodel.find({_id:user_id})
    const foundNumber =  data[0].number
    console.log(foundNumber,resolve_token)    

    try {
        if(resolve_token===foundNumber){
        await Cartmodel.deleteMany({_id:user_id})
        res.send("product remove from cart")
        }
        else{
            res.send("this is not your cart product")
        }
    } catch (error) {
        console.log(error)
        res.send("something went wrong while user want to delete data")
    }
})

module.exports = {user_product_route}