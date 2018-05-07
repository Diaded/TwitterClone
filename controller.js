var mongoose= require('mongoose');
var bodyParser= require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports= function(app){

app.get('/', function(req, res){
  res.sendFile('./index.html');
});

app.post('/login', urlencodedParser, function(req, res){
  console.log(req.body);
});

app.post('/signup', urlencodedParser, function(req, res){
 console.log(req.body);
});
}
