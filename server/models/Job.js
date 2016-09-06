//OLD CODE BEFORE LOGIN
// var db = require("../db")
// var JobSchema = new db.Schema({
//     'fbId': String,
//     'type': String,
//     'company': String,
//     'position': String,
//     'deadline': Date,
//     'status': String,
//     'statusOrder': Number,
//     'link': String,
//     'fav': { type: Boolean, default: false },
//     'modifiedAt': Date
//     // required: true,

// });

//   module.exports = db.model('Job', JobSchema);

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var JobSchema = new mongoose.Schema({
    'fbId': String,
    'type': String,
    'company': String,
    'position': String,
    'deadline': Date,
    'status': String,
    'statusOrder': Number,
    'link': String,
    'fav': { type: Boolean, default: false },
    'modifiedAt': Date
    // required: true,

});

module.exports = mongoose.model('Job', JobSchema);
