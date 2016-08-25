var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  jobs: {
    type: String,
    required: true,
    company: String,
    position: String,
    deadline: Date,
    status: String
  }
});

module.exports = mongoose.model('users', UserSchema);