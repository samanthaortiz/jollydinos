var db = require("../db")

var UserSchema = new db.Schema({
  'name': String,
  'email': String,
  'password': String
});

module.exports = db.model('Users', UserSchema);
