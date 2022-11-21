const express = require("express")
const verify_token = require("../utils/verify_token")

const { add_order, update_order, delete_order, get_all_orders, get_orders, get_one_order } = require("../controllers/office_order")
const route = express.Router()

route.post("/", verify_token, add_order)
route.put("/:id", verify_token, update_order)
route.delete("/:id", verify_token, delete_order)
route.get("/all/", verify_token, get_all_orders)
route.get("/:id", verify_token, get_one_order)
route.get("/", verify_token, get_orders)

module.exports = route