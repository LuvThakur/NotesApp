const mongoose = require('mongoose');
const { Schema } = mongoose;


const NoteSchema = new Schema({
    user:{
           type:mongoose.Schema.Types.ObjectId,
           ref: 'user'
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        default: "Genral"
    },
    comments: [{ body: String, date: Date }],
    date: {
        type: Date,
        default: Date.now
    },
    meta: {
        votes: Number,
        favs: Number
    }

});

module.exports = mongoose.model('notes', NoteSchema);