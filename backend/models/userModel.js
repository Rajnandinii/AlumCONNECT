const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    usermode: {
        type: String,
        required: true,

    },
    gradyear: {
        type: Number,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    peraddress: {
        type: String,
        required: true,
    },
    curaddress: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    interests: {
        type: String,
        required: true,
    },
    otp: {
        type: Number
    },
});

const User=mongoose.model('User', userSchema);
module.exports=User;
