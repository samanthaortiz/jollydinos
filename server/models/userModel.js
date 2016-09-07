var db = require("../db")
var userSchema = new db.Schema({
  "username": String,
  "password": String
});
module.exports = db.model('users', userSchema);
