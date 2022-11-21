const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookie_parser = require("cookie-parser")
const cors = require("cors")

const auth_route = require("./routes/auth")
const office_order_route = require("./routes/office_order")

const PORT = process.env.PORT || 3000
dotenv.config()
const app = express()

const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log("[ERROR]")
            console.log(err);
            throw new Error
        })
}

// middlewares
app.use(cors())
app.use(cookie_parser())
app.use(express.json())


// routes middleware
app.use("/auth", auth_route)
app.use("/orders", office_order_route)

//  error middleware
app.use((err, req, res) => {
    console.log(err)
    res.status(400).send({ error: err })
})

app.listen(PORT, () => {
    connect()
    console.log("Server Started!");
})