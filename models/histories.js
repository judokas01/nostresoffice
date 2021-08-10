const mongoose = require('mongoose')
const Schema = mongoose.Schema


const reviewSchema = new Schema({
    files: Array,
    timestamp: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },type: String
})

module.exports = mongoose.model('History', reviewSchema)