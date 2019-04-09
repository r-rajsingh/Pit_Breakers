var bodyParser = require('body-parser');
var express = require('express');
var app = express();

const port = process.env.PORT || 1337;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Pits_DB";

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/data', function(request, response){
  console.log('\n Data posted succesfully');
  console.log(request.body.location);
  response.contentType('json');
  response.send(JSON.stringify({status: "success", data: request.body}, null, 2));

  MongoClient.connect(url, { useNewUrlParser: true },function(err, client){

    if(err) throw err;
    const db = client.db('Pits_DB')

    db.collection('Location').insertMany(request.body.location, (err,result)=>{
      if(err){
        return console.log('Unable to insert location to Pits_DB',err);
      }
      return console.log('Location inserted successfully');
    });

    db.collection('Linear_acc').insertMany(request.body.linear_acc, (err,result)=>{
      if(err){
        return console.log('Unable to insert linear_acc to Pits_DB',err);
      }
      return console.log('linear_acc inserted successfully');
    });

    db.collection('Gravity_acc').insertMany(request.body.gravity_acc, (err,result)=>{
      if(err){
        return console.log('Unable to insert gravity_acc to Pits_DB',err);
      }
      return console.log('gravity_acc inserted successfully');
    });

    db.collection('Euler_angle').insertMany(request.body.euler_angle, (err,result)=>{
      if(err){
        return console.log('Unable to insert euler_angle to Pits_DB',err);
      }
      return console.log('euler_angle inserted successfully');
    });

    db.collection('Angular_acc').insertMany(request.body.angular_acc, (err,result)=>{
      if(err){
        return console.log('Unable to insert angular_acc to Pits_DB',err);
      }
      return console.log('angular_acc inserted successfully');
    });

    client.close();
   });
});

app.listen(port, ()=>{
  console.log(`server up on port ${port}`);
});
