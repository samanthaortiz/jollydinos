var Job = require('./jobModel.js');

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

  getAllArchive: function(req, res){
    console.log("in get all archive")
    Job.find({})
    .where('email').equals('test@test.com')
    .exec(function(err, jobs){
      var ret = jobs.filter(function(x){
        return x.archived
      })
      res.json(ret);
    });
  },

  addOne: function(req, res) {
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