var db = require("../db")

var JobSchema = new db.Schema({
    'email': String,
    'type': String,
    'company': String,
    'position': String,
    'deadline': Date,
    'status': String,
    'statusOrder': Number,
    'link': String,
    'modifiedAt': Date,
    'fav': { type: Boolean, default: false },
    'archived': { type: Boolean, default: false }
});

module.exports = db.model('Job', JobSchema);
