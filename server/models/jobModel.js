var mongoose = require("mongoose")

var JobSchema = new mongoose.Schema({
    'email': String,
    'type': String,
    'company': String,
    'position': String,
    'deadline': Date,
    'status': String,
    'resume': String,
    'statusOrder': Number,
    'link': String,
    'modifiedAt': Date,
    'fav': { type: Boolean, default: false },
    'archived': { type: Boolean, default: false }
});

module.exports = mongoose.model('Job', JobSchema);
