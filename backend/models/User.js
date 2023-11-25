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
    }

});

module.exports = mongoose.model('user', UserSchema);