var router = require('express').Router();

//Import models
var User = require('./models/User');
var Job = require('./models/Job');

router.get('/listing', function(req, res){
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
  // var company = req.body.company;
  // var position = req.body.position;
  // var deadline = req.body.deadline;
  // var status = req.body.status
  // console.log("#################", company, position, deadline,"###################3")
  Job.findByIdAndUpdate(req.body._id, req.body, function (err) {
    // job.company = company;
    // job.position = position;
    // job.deadline = deadline;
    // job.status = status;
    // console.log("#################", job)
    if (err) throw err;
    res.send(req.body);
  });
});


module.exports = router;
