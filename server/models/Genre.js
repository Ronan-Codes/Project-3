const { Schema, model } = require('mongoose');

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
},
{
    toJson: {
        virtuals: true,
        getters: true
    }
});

const Genre = model('Genre', genreSchema);

module.exports = Genre;
