const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String, // String is shorthand for {type: String}
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    password: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        default: ''
    },
    resetToken: {
        type: String,
        default: ''
    },
    resetTokenExpiration: {
        type: Date
    }
});

module.exports = mongoose.model('user', UserSchema);