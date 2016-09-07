var router = require('express').Router();

//Import models
var User = require('./models/User');
var Job = require('./models/Job');
// var util = require('./util')


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

router.get('/listing', function(req, res){
  // console.log('ID', req.body)
  Job.find(function(err, doc){
    res.json(doc);
  });
});

router.post("/listing", function(req, res) {
  new Job ({
    'type': req.body.type,
    'company': req.body.company,
    'position': req.body.position,
    'deadline': req.body.deadline,
    'link': req.body.link,
    'resume': req.body.resume,
    'status': req.body.status,
    'statusOrder': orders[req.body.status],
    'modifiedAt': new Date()
  })
  .save(function(err, task){
    res.status(201).json(task)
  });
});

router.delete("/listing", function(req, res) {
  Job.findByIdAndRemove(req.body._id, function (err) {
    if (err) throw err;
    res.send(req.body);
  });
});

router.put("/listing", function(req, res) {
  req.body.statusOrder = orders[req.body.status];
  Job.findByIdAndUpdate(req.body._id, req.body, function (err) {
    if (err) throw err;
    res.send(req.body);
  });
});


module.exports = router;
