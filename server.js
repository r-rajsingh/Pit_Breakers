var bodyParser = require('body-parser');
var express = require('express');
var app = express();
//require("babel/polyfill");

const port = process.env.PORT || 1337;

//app.use(multer()); // for parsing multipart/form-data
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/data', function(request, response){
  console.log(request.body);
  response.contentType('json');
  response.send(JSON.stringify({status: "success", data: request.body}, null, 2));
});

app.listen(port, '192.168.1.103', ()=>{
  console.log(`server up on port ${port}`);
});
