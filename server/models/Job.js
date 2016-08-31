var db = require("../db")

var JobSchema = new db.Schema({

    'type': String,
    'company': String,
    'position': String,
    'deadline': Date,
    'status': String,
    'fav': { type: Boolean, default: false }
    // required: true,

});

  module.exports = db.model('Job', JobSchema);
