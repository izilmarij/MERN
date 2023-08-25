const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    commentor: String,
    comment: String
});

const dataSchema = new mongoose.Schema({
    headline: {
        type: String,
        required:[true,"headline cannot be empty"]
    },
    body: {
        type: String,
        required:[true, "News body cannot be empty"]
    },
    category: {
        type: String,
        required:[true,"no category specified"]
    },
    comments: [subSchema],
    poster: {
        type: String,
        required: [true, "must specify the poster"]
    },
    photo: String
    
});


const Data = mongoose.model('Data', dataSchema);

module.exports = Data;