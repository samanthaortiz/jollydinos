var mongoose = require("mongoose");
// var fs = require('fs');
// var Grid = require('gridfs-stream');

var dbURL = 'mongodb://fox:fox@ds019886.mlab.com:19886/gethired';
module.exports =  mongoose.connect(dbURL, function(err) {
  if (err) console.error("error", err);
  else console.log("Successfully connected to database");
});


// var assert = require('assert');
// var fs = require('fs');
// var mongodb = require('mongodb');

// var uri = 'mongodb://fox:fox@ds019886.mlab.com:19886/gethired';

// module.exports = mongodb.MongoClient.connect(uri, function(error, db) {
//   assert.ifError(error);
//   var dbURL = 'mongodb://fox:fox@ds019886.mlab.com:19886/gethired';

  // var conn = mongoose.connect(dbURL, function(err) {
  //   if (err) console.error("error", err);
  //   else console.log("Successfully connected to database");
  // });

//   var bucket = new mongodb.GridFSBucket(db);

//   fs.createReadStream('./server/my_file.txt').
//     pipe(bucket.openUploadStream('./server/my_file.txt')).
//     on('error', function(error) {
//       assert.ifError(error);
//     }).
//     on('finish', function() {
//       console.log('done!');
//       // process.exit(0);
//     });


//   bucket.openDownloadStreamByName('./server/my_file.txt').
//     pipe(fs.createWriteStream('./server/output.txt')).
//     on('error', function(error) {
//       assert.ifError(error);
//     }).
//     on('finish', function() {
//       console.log('done!');
//       // process.exit(0);
//   });
// });






// exports.create = function(req, res) {

//     var part = req.files.filefield;

//     var writeStream = gfs.createWriteStream({
//         filename: part.name,
//         mode: 'w',
//         content_type:part.mimetype
//     });

//     writeStream.on('close', function() {
//         return res.status(200).send({
//             message: 'Success'
//         });
//     });

//     writeStream.write(part.data);

//     writeStream.end();
// };


