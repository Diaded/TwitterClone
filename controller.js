var data= require('./data');
var bodyParser= require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

var twitter= data.twitter;

module.exports= function(app){

app.get('/', function(req, res){
  res.sendFile('./index.html');
});

app.post('/login', urlencodedParser, function(req, res){
  console.log(req.body);
});

app.post('/signup', urlencodedParser, function(req, res){
 twitter({username: req.body.username, email: req.body.email, password: req.body.password[0], tweets:{arr:['cc']}}).save(function(){
   res.render('index.ejs');
  });
 });

}
