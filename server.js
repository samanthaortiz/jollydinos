var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use("/", express.static(__dirname + "/client/"));


app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000...");
