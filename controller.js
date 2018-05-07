var mongoose= require('mongoose');
var bodyParser= require('body-parser');

module.exports= function(app){

app.get('/', function(req, res){
  res.sendFile('./index.html');
});
}
