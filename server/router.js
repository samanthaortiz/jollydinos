var router = require('express').Router();

//Import models
var User = require('./models/User');
var Job = require('./models/Job');




router.get('/listing', function(req, res){
	Job.find(function(err, doc){
    console.log('REQ BODY', req.body);
    console.log('DOC', doc);
    res.json(doc);
  });

});


module.exports = router;
