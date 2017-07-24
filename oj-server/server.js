const express = require('express');
const app = express();
const path = require('path');

const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
mongoose.connect('mongodb://user:pswd@ds145315.mlab.com:45315/cs503-yang',{useMongoClient:true});


app.use(express.static(path.join(__dirname,'../public/')))
app.use('/',indexRouter);
app.use('/api/v1/',restRouter);

app.use(function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../public')});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});



const http = require('http');
const socketIO = require('socket.io');
const io = socketIO();
