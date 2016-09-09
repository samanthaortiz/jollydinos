var db = require("../db")

var JobSchema = new db.Schema({
    'username': String,
    'type': String,
    'company': String,
    'position': String,
    'deadline': Date,
    'status': String,
    'statusOrder': Number,
    'link': String,
    'resume': String,
    'modifiedAt': Date,
    'resume': Boolean,
    'fav': { type: Boolean, default: false },
    'archived': { type: Boolean, default: false }
});

module.exports = db.model('Job', JobSchema);
