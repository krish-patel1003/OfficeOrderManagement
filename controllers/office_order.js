const mongoose = require("mongoose")
const Office_order = require("../model/office_order")

const add_order = async (req, res) => {
    try {
        let order = new Office_order(req.body)
        await order.save()
    } catch (error) {
        req.err = error
        next()
    }
}


const get_all = async (req, res) => {
    try {
        let orders = await Office_order.find()
        res.send(orders)
    } catch (error) {
        req.err = error
        next()
    }
}

module.exports = { add_order, get_all }