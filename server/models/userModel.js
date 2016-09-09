var db = require("../db")

var userSchema = new db.Schema({
  "name": String,
  "username": String,
  "password": String
});
module.exports = db.model('users', userSchema);

