const mongoose = require("mongoose")

const office_order_schema = mongoose.Schema({
    order_number: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    visibility: {
        type: [String],
        required: true,
    },
    keyword: {
        type: [String]
    },
    category: {
        type: String,
        required: true
    },
    body: {
        type: String,
        requied: true,
    },
    previous: {
        type: mongoose.Schema.Types.ObjectId
    }


}, { timestamps: true })

module.exports = mongoose.model("office_order", office_order_schema)