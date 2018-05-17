var express= require('express');
var controller=require('./controller');
var session= require('express-session');

var app= express();
app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(session({secret: 'ilovenode'}));

controller(app);

app.listen(3000, function(){
  console.log('working');
});
