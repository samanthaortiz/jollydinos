var router = require('express').Router();
var jobController = require('./models/jobController.js');
var userController = require('./models/userController.js');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

router.get('/listing', jobController.getAll);
router.post("/listing", multipartyMiddleware, jobController.addOne);
router.delete("/listing", jobController.deleteOne);
router.put("/listing", multipartyMiddleware, jobController.updateOne);

router.get('/archive', jobController.getAllArchive);
router.post("/archive", jobController.archiveOne);

router.post('/resume', function(req, res) {
	console.log(req.body);
});

router.get('/users', userController.getAll);
router.post("/users", userController.addOne);
router.delete("/users", userController.deleteOne);
router.put("/users", userController.updateScore);

module.exports = router;


