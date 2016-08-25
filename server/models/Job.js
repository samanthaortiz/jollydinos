var db = require("../db")

var JobSchema = new db.Schema({
<<<<<<< 93d59c03d456086ab372e17aa3fe23c4330d7ed0
    'type': String,
    'company': String,
    'position': String,
    'deadline': Date,
    'status': String
    // required: true,
});

  module.exports = db.model('Job', JobSchema);
