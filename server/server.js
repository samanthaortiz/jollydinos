var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./router.js');
var session = require("express-session");
var cors = require('cors');
var util = require("./util.js");

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

/* Any requests to /api handled here */
app.use("/api", util.checkUser, apiRouter);

app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000...");

