const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    "image":String,
    "title":String,
    "price":String,
    "review":String,
})

const Productmodel = mongoose.model("product",productSchema)


module.exports = {Productmodel}