var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('<db-url>');

var Profile = new Schema({
  fullName: { type: String }
});

mongoose.model('profile', Profile);

module.exports = {
  Profile: mongoose.model('profile')
};
