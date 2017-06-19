  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

  var passport = require('passport');
  var session = require('express-session');
  var morgan = require('morgan');
  var flash = require('connect-flash');

  var db = require('./db/db');
  var index = require('./routes/index.route');
  var products = require('./routes/products.route');

  var app = express();
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname + 'node_modules')));

  // view engine setup
  app.set('views', __dirname + '/public');
  app.set('view engine', 'html');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  require('./config/passport')(passport);

  // required for passport
  app.use(session({ secret: 'shoppingcart' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  // routes ======================================================================
  require('./routes/user.route')(app, passport);

  //rendering static pages
  //app.use('/', index);

  //rendering backend data
  app.use('/products', products);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
