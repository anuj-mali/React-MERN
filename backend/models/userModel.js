const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
    },
    lname:{
        type: String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
});

module.exports = mongoose.model('User', userSchema);