var Job = require('./jobModel.js');
var fs = require('fs');

module.exports = {

  getAll: function(req, res){
    Job.find({})
    .where('username').equals(req.session.user)
    .exec(function(err, jobs){
      var data = {}
      data.jobs = jobs.filter(function(x){
        return !x.archived
      })
      data.name = req.session.user;
      res.json(data);
    });
  },

  getAllArchive: function(req, res){
    Job.find({})
    .where('username').equals(req.session.user)
    .exec(function(err, jobs){
      var data = {}
      data.jobs = jobs.filter(function(x){
        return x.archived
      })
      data.name = req.session.user;
      res.json(data);
    });
  },

  addOne: function(req, res) {
    var file = req.files.file;
    req.body.resume = file !== undefined;

    new Job ({
      'username': req.session.user,
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
      if(file !== undefined) {
        fs.readFile(file.path, function(err, data){
          fs.writeFile(__dirname + '/../../resume/' + task._id  + '.' + file.originalFilename.split('.').pop(), data, function(err) {
            if (err) throw err;
            console.log('It\'s saved!');
          });
        });
      }
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
    var file = req.files.file;

    if(file !== undefined) {
      req.body.resume = true;
      fs.readFile(file.path, function(err, data){
        fs.writeFile(__dirname + '/../../resume/' + req.body._id + '.' + file.originalFilename.split('.').pop(), data, function(err) {
          if (err) throw err;
          console.log('It\'s saved!');
        });
      });
    }
    
    delete req.body.$$hashKey
    req.body.statusOrder = orders[req.body.status];
    Job.findByIdAndUpdate(req.body._id, req.body, function (err) {
      if (err) throw err;
      res.send(req.body);
    });
  },

  archiveOne: function(req, res) {  
    console.log("we archived! or un-archived");
    req.body.archived = !req.body.archived;
    Job.findByIdAndUpdate(req.body._id, req.body, function (err) {
      if (err) throw err;
      res.send(req.body);
    });
  }
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