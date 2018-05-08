var data= require('./data');
var getter= require('./getter');
var bodyParser= require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

var twitter= data.twitter;

module.exports= function(app){

app.get('/', function(req, res){
  res.sendFile('./index.html');
});

app.post('/login', urlencodedParser, function(req, res){
  twitter.find({email: req.body.email}, function(err, data){
     getter.setter(data[0].username);
     res.render('index.ejs');
  });
});

app.post('/tweet', urlencodedParser, function(req, res){
  twitter.find({username: getter.getter()}, function(err, data){
    data[0].tweets.push({str:req.body.tweet, likes: 0, rt: 0});
    console.log(data[0]);
    twitter.update({username: data[0].username}, data[0], {upsert: true}, function(){
      res.render('index.ejs');
    });
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
