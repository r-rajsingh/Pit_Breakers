

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path=require('path');
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Pits_DB";

const port = process.env.PORT || 1337;
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('public'));
//app.use(app.router);



app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/signin.html');
});
app.get('/loggedin', function(req, res)
{
    res.sendFile(__dirname + '/index.html');
});



app.post('/signin', function(request, response)
{
console.log(request.body);
response.contentType('json');
response.send({ some: JSON.stringify({response:'json'}) });
MongoClient.connect(url, function(err, db){
  if(err) throw err;
  db.collection('Email_Data').insertOne(request.body,(err,result)=>{
    if(err){
      return console.log('Unable to insert to Pits_DB',err);
    }
    //console.log(JSON.stringify(result.ops,undefined))
  });
  //db.close();
});
});

 app.post('/data', function(request, response)
 {
   //console.log(request.body);
   response.contentType('json');
   response.send({ some: JSON.stringify({response:'json'}) });

   MongoClient.connect(url, function(err, db){
     if(err) throw err;
     db.collection('Users_Data').insertOne(request.body,(err,result)=>{
       if(err){
         return console.log('Unable to insert to Pits_DB',err);
       }
       //console.log(JSON.stringify(result.ops,undefined))
     });
     db.close();
   });
});
/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, ()=>{
  console.log(`server up on port ${port}`);
});
