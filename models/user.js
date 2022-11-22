const mongoose = require("mongoose")

const user_schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    visibility: {
        type: [String],
        required: true,
    },
    is_admin: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model("user", user_schema)