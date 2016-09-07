var mongoose = require("mongoose");

var dbURL = 'mongodb://fox:fox@ds019886.mlab.com:19886/gethired';

module.exports = mongoose.connect(dbURL, function(err) {
  if (err) console.error("errrorrr", err);
  else console.log("Successfully connected to database");
});

