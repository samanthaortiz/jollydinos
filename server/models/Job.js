var db = require("../db")

var JobSchema = new db.Schema({

    'type': String,
    'company': String,
    'position': String,
    'deadline': Date,
    'status': String,
    'fav': String
    // required: true,

});

  module.exports = db.model('Job', JobSchema);
