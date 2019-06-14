const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: {
    type: String
  },
  color: {
    type: String,
    required: true
  },
  activities: {
    type: Array
  }
});

module.exports = mongoose.model('News', newsSchema);
