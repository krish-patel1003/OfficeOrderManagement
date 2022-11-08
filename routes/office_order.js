const express = require("express")
const { add_order, get_all } = require("../controllers/office_order")

const route = express.Router()

route.get("/", get_all)
route.post("/", add_order)

module.exports = route