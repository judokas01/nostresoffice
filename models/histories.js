const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    data: String,
    timestamp: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('History', reviewSchema)