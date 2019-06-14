const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    get: value => value.toLowerCase()
  },
  userGroupName: {
    type: String
  },
  userGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserGroup' }
});

module.exports = mongoose.model('User', userSchema);
