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

const http = require('http');
const socketIO = require('socket.io');
const io = socketIO();

const editorSocketService = require('./services/editorSocketService.js')(io);

const server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('error',onError);
server.on('listening',onListening);

function onError(error){
    throw error;
}

function onListening() {
    const address = server.address();
    // const bind = typeof address == 'string' ? 'pipe ' + address : 'port ' + address.port;
    const bind = address.port
    console.log('listening on ' + bind);
}