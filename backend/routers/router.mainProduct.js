const express =  require("express");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../models/model.users");
const {Productmodel, Cartmodel} = require("../models/model.products")
const mainProductRoute = express.Router()

mainProductRoute.get("/get",async(req,res)=>{
    try {
       var data = await Productmodel.find()
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send("something went wrong while get data in admin side")
    }
})

mainProductRoute.post("/post",async (req,res)=>{
    const data = req.body;
    try {
        const all_data = await Productmodel.insertMany(data)
        res.send("Data added...")
    } catch (error) {
        console.log(error);
        res.send("something went wrong while admin want to post data")
    }
})

mainProductRoute.patch("/update/:product_id",async(req,res)=>{
    var id = req.params.product_id;
    
    console.log(id)
    try {
        var data = await Productmodel.updateMany({_id:id},req.body)
        var cart_data = await Cartmodel.updateMany({productID:id},req.body)
        res.send("product updated")
    } catch (error) {
        console.log(error)
        res.send("something went wrong while admin want to update data")
    }
})


mainProductRoute.delete("/delete/:product_id",async(req,res)=>{
    var id = req.params.product_id;
    
    console.log(id)
    try {
        var data = await Productmodel.deleteMany({_id:id})
        await Cartmodel.deleteMany({productID:id})
        res.send("product deleted")
    } catch (error) {
        console.log(error)
        res.send("something went wrong while admin want to delete data")
    }
})


module.exports = {mainProductRoute}