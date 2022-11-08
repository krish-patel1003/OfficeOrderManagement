const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const order_route = require("./routes/office_order")

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

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello")
})

app.use("/orders", order_route)

app.use((req, res) => {
    console.log(req.err)
    res.status(400).send({ error: req.err })
})


app.listen(PORT, () => {
    connect()
    console.log("Server Started")
})
