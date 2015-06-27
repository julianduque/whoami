var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var Profile = require('./database').Profile;
var app = express();

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/save', function (req, res) {
  var fullName = req.body.fullName;

  Profile.findOne(function (err, profile) {
    if (err || !profile) {
      profile = new Profile();
    }

    profile.fullName = fullName;
    profile.save(function (err) {
      res.render('profile', profile);
    });
  });

});

var server = http.createServer(app);

server.listen(port, function () {
  console.log('Server listening on port ' + port);
});
