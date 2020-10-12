const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

let pictureSchema = new mongoose.Schema({
    path: {
        type: String,
        unique: true
    },
    titles: [{
        title: String,
        votes: Number
        }]
});

pictureSchema.plugin(AutoIncrement, {inc_field: 'id'});


module.exports = pictureSchema;