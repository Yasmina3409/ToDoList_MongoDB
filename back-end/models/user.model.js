const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
    user_name: {
        type: String,
        unique: true
    },
    pwd: String,
})

const User = mongoose.model('User', userSchema);

module.exports = User;