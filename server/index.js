const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(require('./api'))

app.get('*', (req,res,next)=>{
  res.sendFile(path.join(__dirname, '../public/index.html'));
})




module.exports = app
