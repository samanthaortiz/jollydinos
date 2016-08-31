var router = require('express').Router();

//Import models
var User = require('./models/User');
var Job = require('./models/Job');

router.get('/listing', function(req, res){
	Job.find(function(err, doc){
    // console.log('REQ BODY', req.body);
    console.log('DOC', doc);
    res.json(doc);
  });

});

router.post("/listing", function(req, res) {
  console.log('REQ BODY', req.body);
  new Job ({
  'type': req.body.type,
    'company': req.body.company,
    'position': req.body.position,
    'deadline': req.body.deadline,
    'status': req.body.status
})

.save(function(err, task){
    res.status(201).send(task)
  });
});


module.exports = router;
