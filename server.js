var http = require('http');
var path = require('path');
var fs = require('fs');

var port = process.env.PORT || 8080;

var server = http.createServer(function (req, res) {
  fs.createReadStream(path.join(__dirname, 'public', 'index.html')).pipe(res);
});

server.listen(port, function () {
  console.log('Server listening on port ' + port);
});
