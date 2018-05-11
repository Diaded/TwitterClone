var data= require('./data');
var getter= require('./getter');
var bodyParser= require('body-parser');



var urlencodedParser = bodyParser.urlencoded({ extended: false });

var twitter= data.twitter;

module.exports= function(app){

app.get('/', function(req, res){
  res.sendFile(__dirname+'/public/index.html');
});

app.post('/login', urlencodedParser, function(req, res){
  console.log(req.body);

  twitter.find({email: req.body.email}, function(err, data){
    console.log(data);
    if(data.length===0){
      res.sendFile(__dirname+'/public/errlogin.html');
      console.log('wrong username');
    }else{
      if(req.body.password===data[0].password){
        getter.setter(data[0].username);
        twitter.find({}, function(err, data){
          res.render('index.ejs', {data: data});
          console.log(getter.getter());
        });

      }else{
        res.sendFile(__dirname+'/public/errlogin.html');
      }

    }
  });
});

app.post('/tweet', urlencodedParser, function(req, res){
  twitter.find({username: getter.getter()}, function(err, data){
    data[0].tweets.push({str:req.body.tweet, likes: 0, rt: 0});
    console.log(data[0]);
    twitter.update({username: data[0].username}, data[0], {upsert: true}, function(){
      twitter.find({}, function(err, data){
        res.render('index.ejs', {data:data});
      });
    });
  });
});

app.post('/signup', urlencodedParser, function(req, res){
  twitter.find({email: req.body.email}, function(err, data){
    if(data.length>0){
      res.sendFile(__dirname+'/public/errSignUp.html');
    }else{
        twitter.find({username: req.body.username}, function(err, data){
          if(data.length>0){
            res.sendFile(__dirname+'/public/errSignUp.html');
          }else{
            if(req.body.password===req.body.passwordCon){
             twitter({username: req.body.username, email: req.body.email, password: req.body.password, tweets:[]}).save();
             res.sendFile(__dirname+'/public/index.html');
            }else{
              res.sendFile(__dirname+'/public/errSignUp.html');
            }
          }
        });
    }

  });
});

app.post('/mytweets', urlencodedParser, function(req, res){
  twitter.find({username: getter.getter()}, function(err, data){
    res.render('mytweets.ejs', {data:data});
  });
});

app.post('/logout', urlencodedParser, function(req, res){
  getter.setter("null");
  console.log(getter.getter());
  res.sendFile(__dirname+"/public/index.html");
});

app.post('/alltweets', urlencodedParser, function(req, res){
  twitter.find({}, function(err, data){
    res.render('index.ejs', {data: data});
  });
});

app.post('/search', urlencodedParser, function(req, res){
    res.sendFile(__dirname+'/public/search.html');
});

app.post('/searchfor', urlencodedParser, function(req, res){
  twitter.find({username: req.body.username}, function(err, data){
    res.render('user.ejs', {data: data});
  });
});

app.post('/retweet', urlencodedParser, function(req, res){
  console.log(req.body);
  res.json(req.body);
});

app.post('/like', urlencodedParser, function(req, res){
  //console.log(req.body);
  twitter.find({username: req.body.username}, function(err, data){
    for(var i=0; i<data[0].tweets.length; i++){
    if(data[0].tweets[i].str===req.body.str){
      data[0].tweets[i].likes++;
      }
    }
    console.log(data[0]);
    twitter.update({username:req.body.username}, data[0], {upsert:true}, function(){console.log('working')});
  });
  res.json(req.body);
});
}
