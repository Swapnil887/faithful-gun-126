const express = require("express")
const {connection} = require("./config/db")
const {user_route} = require("./routers/router.user")
const {adminRouter} = require("./routers/router.admin")
const {mainProductRoute} = require("./routers/router.mainProduct");
const {validate} = require("./midlewears/middlewear.otp");
const {user_product_route} = require("./routers/router.user.product")
require("dotenv").config()

const app = express()
app.use(express.json())


app.use("/user",user_route)
app.use("/userproduct",user_product_route)


app.use("/admin",adminRouter)
app.use(validate)
app.use("/adminpage",mainProductRoute)




app.listen(4500,async ()=>{
    try {
        await connection;
        console.log("server is running")    
    } catch (error) {
        console.log("something went wrong while server is running")
        console.log(error)
    }
})