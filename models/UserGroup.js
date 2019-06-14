const mongoose = require('mongoose');
const User = require('./User');
const News = require('./News');

const userGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  users: {
    type: Array
  },
  news: {
    type: Array
  }
});

module.exports = mongoose.model('UserGroup', userGroupSchema);
