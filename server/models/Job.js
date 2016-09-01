var db = require("../db")

var JobSchema = new db.Schema({
	'fbId': String,
    'type': String,
    'company': String,
    'position': String,
    'deadline': Date,
    'status': String,
    'statusOrder': Number,
    'fav': { type: Boolean, default: false }
    // required: true,

});

  module.exports = db.model('Job', JobSchema);
