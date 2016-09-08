var Job = require('./jobModel.js');
var db = require('../db.js');
// var mongoose = require('mongoose'),
    // _ = require ('lodash');
// var Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;
// var gfs = new Grid(mongoose.connection.db);

module.exports = {

  getAll: function(req, res){
    Job.find({})
    .where('email').equals(req.session.user)
    .exec(function(err, jobs){
      var ret = jobs.filter(function(x){
        return !x.archived
      })
      res.json(ret);
    });
  },

  addOne: function(req, res) {
    console.log('within add one req server side', req.body)
    // if (req.body.resume){
    //   var part = req.body.resume;
    //   var writeStream = gfs.createWriteStream({
    //     filename: part.name,
    //     mode: 'w',
    //     content_type:part.mimetype
    //   });
    //   writeStream.on('close', function() {
    //     return res.status(200).send({
    //     message: 'Success adding job to db'
    //   });
    // });
    // writeStream.write(part.data);
    // writeStream.end();
    // }
    new Job ({
      'email': req.session.user,
      'type': req.body.type,
      'company': req.body.company,
      'position': req.body.position,
      'deadline': req.body.deadline,
      'link': req.body.link,
      'status': req.body.status,
      'resume': req.body.resume,
      'statusOrder': orders[req.body.status],
      'modifiedAt': new Date()
    })
    .save(function(err, task){
      res.status(201).json(task)
    });
  },

  deleteOne: function(req, res) {
    Job.findByIdAndRemove(req.body._id, function (err) {
      if (err) throw err;
      res.send(req.body);
    });
  },

  updateOne: function(req, res) {
    req.body.statusOrder = orders[req.body.status];
    Job.findByIdAndUpdate(req.body._id, req.body, function (err) {
      if (err) throw err;
      res.send(req.body);
    });
  },

  archiveOne: function(req, res) {  
    console.log("we archived!");
    req.body.archived = true;
    Job.findByIdAndUpdate(req.body._id, req.body, function (err) {
      if (err) throw err;
      res.send(req.body);
    });
  },

//   postFile: function(req, res) {
//     console.log(req.body)
//     var part = req.body.resume;
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
// }

}

var orders = { //If adding or removing labels, be sure to edit max value of adjustStatus in listing controller
  'Interested': 0,
  'Outreach': 1,
  'Phone Interview': 2,
  'Coding Challenge': 3,
  'Onsite Interview': 4,
  'Offer Received': 5,
  'Employer Declined': 6,
  'Offer Declined': 7,
  'Offer Accepted': 8
};