var db = require("../db")

var UserSchema = new db.Schema({
  username: {
    // 'type': String,
    // "username": String,
    // 'required': true,
    // 'unique': true,
    // "password": String
    "fbId": String
  }
});

module.exports = db.model('users', UserSchema);
