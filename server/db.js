// Use local url if not in production -- mlab

module.exports = {
    'url' : 'mongodb://greenfield:dinos@ds017165.mlab.com:17165/jollydinos'
};


/*
============================================================================================
 new login 

var mongoose = require("mongoose");
// var dbURL = process.env.MONGODB_URI;

var dbURL = 'mongodb://greenfield:dinos@ds017165.mlab.com:17165/jollydinos';

//|| "mongodb://localhost/githired";

// Connect and handle errors 
module.exports = mongoose.connect(dbURL, function(err) {
  if (err) console.error("errrorrr", err);
  else console.log("Successfully connected to database", dbURL);
});

*/

