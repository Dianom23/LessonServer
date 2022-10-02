const mongoose = require('mongoose')

const constactSchema = new mongoose.Schema({
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

module.exports = mongoose.model('contacts', constactSchema)