const Office_Order = require("../models/office_order")


const add_order = async (req, res, next) => {
    try {
        let prev_order = false
        if (req.body.previous) {
            prev_order = await Office_Order.findOne({ "order_number": req.body.previous })
            if (!prev_order) {
                res.status(400).send({ error: "Wrong Previous Order Number" })
                return
            }
            req.body.previous = prev_order._id;
        }
        let order = new Office_Order(req.body)
        await order.save()
        await Office_Order.findByIdAndUpdate(prev_order._id, { "next": order._id })
        res.send(order)
    } catch (error) {
        req.err = error
        next()
    }
}

const update_order = async (req, res, next) => {
    try {
        let order = await Office_Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send(order)
    } catch (error) {
        req.err = error
        next()
    }
}

const delete_order = async (req, res, next) => {
    try {
        let order = await Office_Order.findByIdAndDelete(req.params.id)
        res.send(order)
    } catch (error) {
        req.err = error
        next()
    }
}

const get_all_orders = async (req, res, next) => {
    try {
        let orders = await Office_Order.find({
            "visibility": { $in: req.user.visibility },
        })
        res.send(orders)
    } catch (error) {
        req.err = error
        next()
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
        req.err = error
        next()
    }
}


const get_one_order = async (req, res, next) => {
    try {
        let order = await Office_Order.find({ "_id": req.params.id, "visibility": { $in: req.user.visibility } })
        res.send(order)
    } catch (error) {
        req.err = error
        next()
    }
}

module.exports = { add_order, update_order, delete_order, get_all_orders, get_orders, get_one_order }
