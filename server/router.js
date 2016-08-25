var router = require('express').Router();

//Import models
var User = require('./models/User');
var Job = require('./models/Job');




router.get('/listing', function(req, res){
	Job.find({
	"type": req.body.type,
    "required": req.body.required,
    "company": req.body.company,
    "position": req.body.position,
    "deadline": req.body.deadline,
    "status": req.body.status
	})
	save(function(err, task){
    res.status(201).send(task)
  });
});


module.exports = router;
