var http = require('http');
var port = process.env.PORT || 8080;

var server = http.createServer(function (req, res) {
  res.end('Who am I?')
});

server.listen(port, function () {
  console.log('Server listening on port ' + port);
});
