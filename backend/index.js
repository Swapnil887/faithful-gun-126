const express = require("express")
const {connection} = require("./config/db")

const app = express()
app.use(express.json())






app.listen(4500,async ()=>{
    try {
        await connection;
        console.log("server is running")    
    } catch (error) {
        console.log("something went wrong while server is running")
        console.log(error)
    }
})