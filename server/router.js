//Import models
var User = require('./models/User');
var Job = require('./models/Job');

module.exports = function(router, passport) {

router.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

router.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

router.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

router.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

 router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

 router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

     router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

          router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

var auth = function(req, res, next){
  if(!req.isAuthenticated()){
    res.send(401);
  }
  else{
    next();
  }
}


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
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
// module.exports = router;




/*

==========================================================================================
**old code using FB authentication

var router = require('express').Router();

//Import models
var User = require('./models/User');
var Job = require('./models/Job');
var util = require('./util')


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
