var User = require('./models/userModel.js');
var bcrypt = require('bcrypt-nodejs');

exports.createUser = function(req, res){
  console.log(req.body.username);
  var username = req.body.username;
  var password = req.body.password;
  User.find({ username: username }, function(err, users){
    if(!users || !users.length)
      bcrypt.hash(password, null, null, function(err, hash){
        // user must be instantiated before being saved.
        new User({
          username: username,
          password: hash
        }).save(function(err, user) {
          console.log("created");
          res.send(201); // Created!
        });
      });
    else res.send(409); // Username was taken.
  });
}

/* Helper middleware function to check auth */
exports.checkUser = function(req, res, next) {
  if (!(req.session ? !!req.session.user : false)) res.send(401);
  else next();
};

/* Helper function to compare passwords */
exports.checkPassword = function(req, res){
  console.log('login', req.body.username, req.body.password);
  User.find({ "username": req.body.username }, function(err, found) {
    foundUser = found[0];
    if(foundUser)
      bcrypt.compare(req.body.password, foundUser.password, function(err, result){
        if(result)
          req.session.regenerate(function(){
            req.session.user = foundUser.username;
            res.send(200);
          });
        else res.send(401);
      });
    else res.send(401); // No user found.
  });
}

/* Helper function to destroy session */
exports.destroySession = function(req, res) {
  req.session.destroy();
  res.redirect("/");
  console.log("destroyed")
}
