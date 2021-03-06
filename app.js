require('babel-register')({
  extensions: ['.js'],
  presets: ['es2015', 'react'],
  only: '/public/javascripts/react/',
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var authConfig = require('./config/auth');
var GithubStrategy = require('passport-github').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoSanitize = require('express-mongo-sanitize');

var routes = require('./routes/index');
var posts = require('./routes/posts');

var app = express();

passport.serializeUser(function(user, done) {
  const suser = {
    id: user.id,
    username: user.username
  }
  done(null, suser);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

var github = authConfig.github.prod;
if (app.get('env') === 'development' && authConfig.github.dev) {
  github = authConfig.github.dev;
}
if (app.get('env') === 'test' && authConfig.github.test) {
  github = authConfig.github.test;
}
passport.use(new GithubStrategy(github,
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/deanproxy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(express.static(path.join(__dirname, 'public')));

var sessionStore = new MongoStore({
  db: 'deanproxy',
  mongooseConnection: mongoose.connection
});

app.use(session({
  key: 'wat-secret-store',
  secret: 'wat-secret-store',
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { maxAge: 7*24*60*60*1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github',
  passport.authenticate('github', {scope: ['profile']}));

app.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    console.log(`${req.user.id} has tried to login.`);
    if (req.user.id !== github.userId) {
      console.log(`${req.user.id} !== ${github.userId}`);
      req.logout();
      res.redirect('/login');
    } else {
      res.redirect('/admin');
    }
  });

app.use('/', routes);
app.use('/posts', posts);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(`Error ${err.status}: ${err.message}`);
    res.render('error', {
      status: err.status,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    status: err.status,
    error: {}
  });
});


module.exports = app;
