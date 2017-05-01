const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser')
app.set('view engine', 'ejs');
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
  db.collection('items').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('pages/index.ejs', {items: result})
  })
})

app.get('/support', function (req, res) {
    res.render('pages/support', {
    })
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

app.get('/admin', function (req, res){
    res.render('pages/admin', {
        
    })
});

MongoClient.connect('mongodb://user:password@ds127391.mlab.com:27391/items', (err, database) => {
  // ... start the server
  if (err) return console.log(err);
  db = database;
  app.listen(8081, () => {
    console.log('listening on 8081')
  });
});
