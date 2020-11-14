const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

let pictureSchema = new mongoose.Schema({
    path: {
        type: String,
        unique: true
    },
    human_titles: [{
        title: String,
        votes: Number
    }],
    baseline_titles: [{
            title: String,
            votes: Number
    }],
    seq2seq_titles: [{
        title: String,
        votes: Number
    }]
});

pictureSchema.plugin(AutoIncrement, {inc_field: 'id'});


module.exports = pictureSchema;