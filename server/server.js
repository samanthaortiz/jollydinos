var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./router.js');
var session = require("express-session");
var cors = require('cors');
var util = require("./util.js");

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: "FABFOXESJOLLYDINO",
  resave: false,
  saveUninitialized: true
}));


app.use("/", express.static(__dirname + "/../client/"));

/* Any requests to /api handled here */
app.use("/api", util.checkUser, apiRouter);
// app.use("/api",apiRouter);

/* Authentication Routes */
app.post("/login", util.checkPassword);
app.post("/logout", util.destroySession);
app.post("/signup", util.createUser);

app.listen(port);
console.log("Listening on port ", port);

