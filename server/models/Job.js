var db = require("../db")

var JobSchema = new db.Schema({
  jobs: {
    type: String,
    required: true,
    company: String,
    position: String,
    deadline: Date,
    status: String
  }
});

  module.exports = db.model('jobs', JobSchema);
