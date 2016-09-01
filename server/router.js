var router = require('express').Router();

//Import models
var User = require('./models/User');
var Job = require('./models/Job');
var util = require('./util')


// router.get('/listing/:id', function(req, res){
//   console.log('PARAMS', req.params);
//   console.log('ATTR', req.attr);
// 	Job.find({id: req.params.id}, function(err, doc){
//     console.log("ALL JOBS FOR ID", req.fbId)
//     res.json(doc);
//   });

// });

router.get('/listing', function(req, res){
  // console.log('ID', req.body)
  Job.find(function(err, doc){
    res.json(doc);
  });

});

router.post("/listing", function(req, res) {
  var orders = {
    'Interested': 0,
    'Outreach': 1,
    'Phone Interview': 2,
    'Coding Challenge': 3,
    'Onsite Interview': 4,
    'Offer Received': 5,
    'Employer Declined': 6,
    'Offer Accepted': 6,
    'Offer Declined': 6
  };

  new Job ({
    'type': req.body.type,
    'company': req.body.company,
    'position': req.body.position,
    'deadline': req.body.deadline,
    'link': req.body.link,
    'status': req.body.status,
    'statusOrder': orders[req.body.status]
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
  Job.findByIdAndUpdate(req.body._id, req.body, function (err) {
    if (err) throw err;
    res.send(req.body);
  });
});



module.exports = router;
