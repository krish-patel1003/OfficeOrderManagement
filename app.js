const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookie_parser = require("cookie-parser")
const cors = require("cors")
const morgan = require("morgan")
const fs = require("fs")

const auth_route = require("./routes/auth")
const office_order_route = require("./routes/office_order")

const PORT = process.env.PORT || 3000
dotenv.config()
const app = express()
let accessLogStream = fs.createWriteStream('./access.log', {flags: 'a'})


const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to database")
    })
    .catch((err) => {
        console.log("[ERROR]")
        console.log(err)
        throw new Error
    })
}

// middlewares
app.use(morgan({stream: accessLogStream}))
app.use(cors())
app.use(cookie_parser())
app.use(express.json())


// routes middleware
app.use("/auth", auth_route)
app.use("/orders", office_order_route)

//  error middleware
app.use((req, res) => {
    if (req.err) {
        res.status(400).send({ error: req.err })
    }
    else {
        res.status(404).send({ error: "404 page not found !"})
    }
})

app.listen(PORT, () => {
    connect()
    console.log("Server Started!");
})
