const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{
        type: String,
        required: true,
        unique:true,
        match: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    },
    password:{
        type: String,
        required: true
    },
    userImage:{
        type: String,
    },
    userRole:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("User", userSchema);