var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var cors = require('cors');
var bodyParser = require('body-parser')
var http = require('http')

mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

var api = require('./routes/api');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/', function(req, res) {
  res.send('Page under construction.');
});

/*
var request = {
  host: "localhost",
  port: "3000",
  path: "/api/signin",
  method: "POST",
  body: {
    username: "cesar-sartori@hotmail.com"
    ,password: "cesar12345"
  }
}

http.request(request, (res) => {
  var token = res.body.token
})
*/
app.use('/api', api);
/*
app.post("/postForm", (req,res) => {
  console.log('Enviando formulário...')
  var request = {
    host: "localhost",
    port: "3000",
    path: "/api/wedding",
    method: "POST",
    body: { 
        casal: {
              noivo: { 
                nome : req.body.nomeNoivo,
                idade: req.body.idadeNoivo,
                genero: req.body.generoNoivo
              }
            }
    }
  }
  http.request(request, (res) => {
    console.log(res)
  })
  res.end()           
})
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
