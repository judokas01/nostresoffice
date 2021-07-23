const mongoose = require('mongoose')
const Schema = mongoose.Schema


const dataSchema = new Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
})

const reviewSchema = new Schema({
    data: dataSchema,
    sessionId: String,
    timestamp: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },finished: Boolean
})

module.exports = mongoose.model('History', reviewSchema)