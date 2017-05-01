const express = require('express');
const app = require('express')();
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser');
    
var http = require('http').Server(app);
var io = require('socket.io')(http);

var db;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
  db.collection('items').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('pages/index.ejs', {items: result})
  });
});

app.get('/support', function (req, res) {

    res.render('pages/support.ejs', {
    });
});

app.get('/admin', function (req, res){
  db.collection('items').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('pages/admin.ejs', {items: result})
  });
});

app.post('/add', (req, res) =>{
   db.collection('items').save(req.body, (err, results) => {
        if (err) return console.log(err);
        res.redirect('/admin');
   });
});

app.post('/remove', (req, res) => {
    console.log(req.body);
   db.collection('items').remove(req.body, (err, results) => {
        if (err) return console.log(err);
     res.redirect('/admin');
    });
});

io.on('connection', function(socket){
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

});

MongoClient.connect('mongodb://user:password@ds127391.mlab.com:27391/items', (err, database) => {
  // ... start the server
  if (err) return console.log(err);
  db = database;
  http.listen(8081, () => {
    console.log('listening on 8081');
  });

});
