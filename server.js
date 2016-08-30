var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./server/router.js');
var cors = require('cors');


var app = express();
app.use(bodyParser.json());
app.use(cors());



app.use("/", express.static(__dirname + "/client/"));

app.use("/api", apiRouter);


app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000...");
