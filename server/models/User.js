// var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');


// var users = mongoose.Schema({
//    local            : {
//         email        : String,
//         password     : String,
//         name         : String
//     }
// });


// users.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// };
// // checking if password is valid
// users.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };


// module.exports = mongoose.model('User', users);

// /*
// ==========================================================================================



var db = require("../db")
var UserSchema = new db.Schema({
  //username: {
    // 'type': String,
    // "username": String,
    // 'required': true,
    // 'unique': true,
    // "password": String
    "fbId": String
  //}
});
module.exports = db.model('users', UserSchema);
