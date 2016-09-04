var User = require('./models/User');


exports.createUser = function(req, res){
  var id = req.body.id;
  User.find({ id: id }, function(err, users){
    if( !users || !users.length)
    	new User({
          id: id
        }).save(function(err, user) {
          res.send(201); // Created!
        })
        else res.send(409); // ID was taken.
});
}



exports.checkUser = function(req, res, next) {
  if (!(req ? !!req.user : false)) res.send(401);
  else next();
};