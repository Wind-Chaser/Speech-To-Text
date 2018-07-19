var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cfenv = require('cfenv');

var vcapServices = require('vcap_services');

var appEnv = cfenv.getAppEnv();
var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('appName', 'Speech-To-Text');

app.set('port', process.env.PORT || 8080);
app.get('/',function(req,res){
res.sendFile(__dirname+'/HTML/login.html');
});
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/HTML'));
app.use(bodyParser.json());

app.use('/', require("./controller/restapi/router"));

app.get('/speechtotext',function(req,res){
  res.sendFile(__dirname+'/HTML/index.html');
});

app.post('/user',function(req,res){
  var data=req.body;
  res.cookie('data',data).sendStatus(200);
});

app.get('/user',function(req,res){
  res.send(req.cookies.data);
});

http.createServer(app).listen(app.get('port'),
    function(req, res) {
        console.log(app.get('appName')+' is listening on port: ' + app.get('port'));
});
