const express = require("express")
const { add, get_all } = require("../controllers/office_order")

const route = express.Router()

route.get("/", get_all)
route.post("/", add_order)

module.exports = route