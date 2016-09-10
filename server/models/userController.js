var User = require('./userModel.js');
var Job = require('./jobModel.js');

var orders = {
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

module.exports = {

  updateScore: function(req,res){
    Job.find({})
    .where('username').equals(req.session.user)
    .exec(function(err, jobs){
      var data = {}
      var jobsApplied = 0;
      var offersReceived = 0;
      var offersDeclined = 0;
      var appsRejected = 0;
      var accepted = '';
      var order;
      for (var i in jobs) {
        order = jobs[i].statusOrder
        if (order >= 1) {
          jobsApplied += 1;
        }

        if (order >= 5) {
          offersReceived += 1;
        }
        console.log(jobs[i])
        if(order === 6) {
          appsRejected += 1
        } else if (order === 7) {
          offersDeclined += 1;
        } else if (order === 8) {

          accepted = jobs[i].position + ", " + jobs[i].company;
        }
      }
      // console.log(req.session.user)
      User.find({})
      .where('name').equals(req.session.user)
      .exec(function(err, user){
        user[0].jobsApplied = jobsApplied
        user[0].offersReceived = offersReceived
        user[0].offersDeclined = offersDeclined
        user[0].appsRejected = appsRejected
        user[0].offerAccepted = accepted
        
        User.findByIdAndUpdate(user[0]._id, user[0], function(err){
          if (err) throw err;
          // console.log(user[0])
          res.send(user[0])
        })

      })

      // data.name = req.session.user;
      // res.json(data);

    });

  },

  getAll: function(req, res){
    User.find({})
    .exec(function(err, users){
      var data = {}
      data.users = users
      res.json(data);
    });
  },

  addOne: function(req, res) {
    new User ({
      'name': req.body.name,
      'username': req.body.username,
       //'password': //tbd
      'modifiedAt': new Date()
    })
    .save(function(err, task){
      res.status(201).json(task)
    });
  },

  deleteOne: function(req, res) {
    User.findByIdAndRemove(req.body._id, function (err) {
      if (err) throw err;
      res.send(req.body);
    });
  },

  updateOne: function(req, res) {
    req.body.statusOrder = orders[req.body.status];
    User.findByIdAndUpdate(req.body._id, req.body, function (err) {
      if (err) throw err;
      res.send(req.body);
    });
  },


}
