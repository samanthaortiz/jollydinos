var router = require('express').Router();
var jobController = require('./models/jobController.js')

router.get('/listing', jobController.getAll);
router.post("/listing", jobController.addOne);
router.delete("/listing", jobController.deleteOne);
router.put("/listing", jobController.updateOne);
router.post("/archive", jobController.archiveOne);
// router.get("/upload/:filename", jobController.getFile);
// router.post("/upload", jobController.postFile);

module.exports = router;
