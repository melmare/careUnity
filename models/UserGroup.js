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
  },
  toDos: {
    type: Array
  },
  location: {
    type: Object
  },
  medicationList: {
    type: Array
  },
  medicalComments: {
    type: Array
  }
});

module.exports = mongoose.model('UserGroup', userGroupSchema);
