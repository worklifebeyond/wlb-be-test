const db = require('../config/connect')
const mongoose = require('mongoose')
const { Schema } = mongoose



const logSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    detailUser: {
        type: Object,
        required: true
    },
    accessTime: {
        type: Number,
        required: true
    },
    reqObject: {
        type: Object,
        required: true
    },
    resObject: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
})

const log = mongoose.model("Log", logSchema)

module.exports = log