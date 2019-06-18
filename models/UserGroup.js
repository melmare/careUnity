const mongoose = require('mongoose');

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
  newsList: {
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
