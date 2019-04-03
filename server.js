var bodyParser = require('body-parser');
var express = require('express');
var app = express();

const port = process.env.PORT || 1337;

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

app.listen(port, ()=>{
  console.log(`server up on port ${port}`);
});
