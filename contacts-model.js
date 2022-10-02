const { AggregationCursor } = require('mongodb')
const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('contacts', contactSchema)