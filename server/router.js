var router = require('express').Router();
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

router.get('/users', userController.getAll);
router.post("/users", userController.addOne);
router.delete("/users", userController.deleteOne);
router.put("/users", userController.updateScore);

module.exports = router;


