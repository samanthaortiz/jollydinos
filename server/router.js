var router = require('express').Router();
var jobController = require('./models/jobController.js');
var userController = require('./models/userController.js');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var jobController = require('./models/jobController.js')
var userController = require('./models/userController.js')

router.get('/listing', jobController.getAll);
router.post("/listing", multipartyMiddleware, jobController.addOne);
router.delete("/listing", jobController.deleteOne);
router.put("/listing", multipartyMiddleware, jobController.updateOne);

router.get('/archive', jobController.getAllArchive);
router.post("/archive", jobController.archiveOne);

router.get('/resume/:id/:company', function(req, res) {
  res.download(__dirname + '/../resume/' + req.params.id, req.params.company + '_resume', function(err){
    if(err) console.log(err);
  });
});

router.get('/users', userController.getAll);
router.delete("/users", userController.deleteOne);
router.put("/users", userController.updateScore);

module.exports = router;

	
