var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);

server.listen(port, function () {
  console.log('Server listening on port ' + port);
});
