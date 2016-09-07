var router = require('express').Router();
var jobController = require('./models/jobController.js')

router.get('/listing', jobController.getAll);
router.post("/listing", jobController.addOne);
router.delete("/listing", jobController.deleteOne);
router.put("/listing", jobController.updateOne);
router.post("/archive", jobController.archiveOne);

module.exports = router;
