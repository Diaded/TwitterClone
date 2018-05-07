var mongoose= require('mongoose');

mongoose.connect('mongodb://diade:diade@ds217360.mlab.com:17360/twitterclone');

var twitSchema=  mongoose.Schema({
  username: String,
  email: String,
  password: String,
  tweets: Object
});
exports.twitter= mongoose.model('twitter', twitSchema);
