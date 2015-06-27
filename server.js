var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/save', function (req, res) {
  var fullName = req.body.fullName;
  res.end(fullName);
});

var server = http.createServer(app);

server.listen(port, function () {
  console.log('Server listening on port ' + port);
});
