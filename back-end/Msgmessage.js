const mongoose = require('mongoose');

const message = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registeruser'
    },
    username: {
        type: String,
        required: true
    },
    text: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('msgModel', message);