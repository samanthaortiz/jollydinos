var mongoose = require("mongoose");

/* Use local url if not in production -- mlab*/
// var dbURL = process.env.MONGODB_URI;

var dbURL = 'mongodb://greenfield:dinos@ds017165.mlab.com:17165/jollydinos';

//|| "mongodb://localhost/githired";

/* Connect and handle errors */
module.exports = mongoose.connect(dbURL, function(err) {
  if (err) console.error("errrorrr", err);
  else console.log("Successfully connected to database", dbURL);
});
