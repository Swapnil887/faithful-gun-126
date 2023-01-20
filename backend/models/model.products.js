const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    "image":String,
    "title":String,
    "price":String,
    "review":String,
    "number":String
})

const Productmodel = mongoose.model("product",productSchema)

const cartSchema = mongoose.Schema({
    "image":String,
    "title":String,
    "price":String,
    "review":String,
    "productID":String,
    "number":String
})

const Cartmodel = mongoose.model("cart",cartSchema)





module.exports = {Productmodel,Cartmodel}


// { "image": "https://cdn.shopclues.com/images/banners/view_all_demo.jpg",
//     "s": "View All",
//     "row href": ""
//   },