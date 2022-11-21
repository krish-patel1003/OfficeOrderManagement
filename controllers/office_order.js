const Office_Order = require("../models/office_order")


const add_order = async (req, res, next) => {
    try {
        let order = new Office_Order(req.body)
        await order.save()
        res.send(order)
    } catch (error) {
        next(error)
    }
}

const update_order = async (req, res, next) => {
    try {
        let order = await Office_Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send(order)
    } catch (error) {
        next(error)
    }
}

const delete_order = async (req, res, next) => {
    try {
        let order = await Office_Order.findByIdAndDelete(req.params.id)
        res.send(order)
    } catch (error) {
        next(error)
    }
}

const get_all_orders = async (req, res, next) => {
    try {
        let orders = await Office_Order.find({
            "visibility": { $in: req.user.visibility },
        })
        res.send(orders)
    } catch (error) {
        next(error)
    }
}


const get_orders = async (req, res, next) => {

    let query = { visibility: { $in: req.user.visibility } }

    if (req.query.cat)
        query.category = req.query.cat
    if (req.query.q)
        query.$text = { $search: req.query.q }

    try {
        let orders = await Office_Order.find(query)
        res.send(orders)
    } catch (error) {
        next(error)
    }
}


const get_one_order = async (req, res, next) => {
    try {
        let order = await Office_Order.find({ "_id": req.params.id, "visibility": { $in: req.user.visibility } })
        res.send(order)
    } catch (error) {
        next(error)
    }
}

module.exports = { add_order, update_order, delete_order, get_all_orders, get_orders, get_one_order }
