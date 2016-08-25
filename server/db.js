var mongoose = require("mongoose");

/* Use local url if not in production -- mlab*/
var dbURL = process.env.DBURL || process.env.MONGODB_URI || "mongodb://localhost/workshop";

/* Connect and handle errors */
module.exports = mongoose.connect(dbURL, function(err) {
  if (err) console.error(err);
  else console.log("Successfully connected to database");
});
