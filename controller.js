var data= require('./data');
var bodyParser= require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

var twitter= data.twitter;

module.exports= function(app){

app.get('/', function(req, res){
  res.sendFile('./index.html');
});

app.post('/login', urlencodedParser, function(req, res){
  twitter.find({email: req.body.email}, function(){
    res.render('index.ejs');
  });
});

app.post('/signup', urlencodedParser, function(req, res){
if(req.body.password===req.body.passwordCon){
 twitter({username: req.body.username, email: req.body.email, password: req.body.password, tweets:[]}).save();
 res.sendFile(__dirname+'/public/index.html');
}else{
  res.send("Password dont match");
}
});

}
