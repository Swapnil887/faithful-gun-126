const mongoose = require("mongoose")
require("dotenv").config();

const connection = mongoose.connect("mongodb+srv://swapnil:swapnil@cluster0.tush2vw.mongodb.net/shopperia?retryWrites=true&w=majority");

module.exports = {connection}