var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

var server = app.listen(process.env.PORT || 3005);

module.exports = server;
