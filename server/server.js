var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./router.js');
var session = require("express-session");
var cors = require('cors');
var util = require("./util.js");
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

require('./db.js');

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: "FABFOXESJOLLYDINO",
  resave: false,
  saveUninitialized: true
}));

/* Middleware to serve static assets in /client */
app.use("/", express.static(__dirname + "/../client/"));

/* Authentication Routes */
app.post("/login", util.checkPassword);
app.post("/logout", util.destroySession);
app.post("/signup", util.createUser);


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname+ '-' + Date.now()+'.jpg')
//     }
// });

// app.post('/uploads', upload.single('file'));

/* Any requests to /api handled here */
app.use("/api", util.checkUser, apiRouter);

app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000...");

