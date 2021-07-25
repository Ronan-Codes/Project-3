const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const moment = require('moment');

const photoSchema = new Schema({
    photoText: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJson: {
        virtuals: true,
        getters: true
    },
    id: true
})

const Photo = model('Photo', photoSchema);

module.exports = Photo;