const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  activities: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Entry', entrySchema);
