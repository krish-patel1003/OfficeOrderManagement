const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const PORT = process.env.PORT || 3000

dotenv.config()
const app = express()

const connect = async () => {
    try {
        console.log(process.env.PORT)
        await mongoose.connect(process.env.MONGODB)
        console.log('Connect to the database');
    }
    catch (err) {
        throw err
    }
}

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(PORT, () => {
    connect()
    console.log("Server Started")
})
