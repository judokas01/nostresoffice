const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Task = require('./tasks')
const Payment = require('./payments')
const randomstring = require("randomstring")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: String,
    lastname: String,
    active: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tier: {
        type: String,
        enum: ['free', 'paid'],
        default: 'free'
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    },
    verifyCode: {
        type: String,
        default: randomstring.generate()
    }

})

/**
 *  delete reviews to prevent orphans
 */
UserSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Task.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

UserSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Payment.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)