var db = require("../db")

var userSchema = new db.Schema({
  "name": String,
  "username": String,
  "password": String,
  "jobsApplied": {type : Number, default: 0},
  "offersReceived": {type : Number, default: 0},
  "offersDeclined": {type : Number, default: 0},
  "appsRejected": {type : Number, default: 0},
  "offerAccepted":{type : String, default: ''}

});
module.exports = db.model('users', userSchema);

