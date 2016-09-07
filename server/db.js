// Use local url if not in production -- mlab
// module.exports = {
//   'url' : 'mongodb://greenfield:dinos@ds017165.mlab.com:17165/jollydinos'
// };



var mongoose = require("mongoose");

// Use local url if not in production -- mlab
// var dbURL = process.env.MONGODB_URI;

var dbURL = 'mongodb://easy:123@ds017165.mlab.com:17165/jollydinos';

// Connect and handle errors
module.exports = mongoose.connect(dbURL, function(err) {
  if (err) console.error("errrorrr", err);
  else console.log("Successfully connected to database", dbURL);
});

