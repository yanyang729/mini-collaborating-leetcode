const express = require('express');
const app = express();

const restRouter = require('./routes/rest');
const mongoose = require('mongoose');
mongoose.connect('mongodb://user:pswd@ds145315.mlab.com:45315/cs503-yang',{useMongoClient:true});



app.use('/api/v1/',restRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


