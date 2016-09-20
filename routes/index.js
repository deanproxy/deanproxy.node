const express = require('express');
const nodemailer = require('nodemailer');
const Post = require('../models/post');
const router = express.Router();

const React = require('react');
const ReactDOM = require('react-dom/server');

const shared = require('./shared');

const Login = require('../public/javascripts/react/login').default;
const Code  = require('../public/javascripts/react/code').default;
const Music = require('../public/javascripts/react/music').default;
const Contact = require('../public/javascripts/react/contact').default;
const Edit = require('../public/javascripts/react/edit').default;
const AdminIndex = require('../public/javascripts/react/admin-index').default;

const LoginElement = React.createFactory(Login);
const CodeElement = React.createFactory(Code);
const MusicElement = React.createFactory(Music);
const ContactElement = React.createFactory(Contact);
const AdminIndexElement = React.createFactory(AdminIndex);
const EditElement = React.createFactory(Edit);

router.get('/', (req, res) => {
  res.redirect('/posts');
});

router.get('/code', (req, res) => {
  res.render('index', {react: ReactDOM.renderToString(CodeElement())});
});
router.get('/music', (req, res) => {
  res.render('index', {react: ReactDOM.renderToString(MusicElement())});
});
router.get('/contact', (req, res) => {
  res.render('index', {react: ReactDOM.renderToString(ContactElement())});
});

router.get('/login', (req, res) => {
  res.render('index', {react: ReactDOM.renderToString(LoginElement())});
});
router.get('/admin', shared.authMiddleware, (req, res) => {
  const options = {
    limit: 5,
    skip: 0
  }

  if (req.query.limit) {
    options.limit = req.query.limit;
  }
  if (req.query.skip) {
    options.skip = req.query.skip;
  }

  shared.queryPosts(options).then(posts => {
    const obj = {
      posts: posts
    };
    if (req.accepts('html')) {
      res.render('index', {
        react: ReactDOM.renderToString(AdminIndexElement(obj)),
        state: JSON.stringify(obj)
      });
    } else {
      res.json(posts);
    }
  });
});
router.get('/admin/new', shared.authMiddleware, (req, res) => {
  res.render('index', {react: ReactDOM.renderToString(EditElement())});
});
router.get('/admin/edit/:id', shared.authMiddleware, (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var obj = {
      post: post
    };
    res.render('index', {
      react: ReactDOM.renderToString(EditElement(obj)),
      state: JSON.stringify(obj)
    });
  });
});
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/email', (req, res) => {
  const message = {
    to: 'dean@deanproxy.com',
    from: req.body.email,
    text: req.body.message,
    subject: '[deanproxy] message'
  }

  const transporter = nodemailer.createTransport('smtp://localhost');
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
  });
});

router.get('/admin/user', (req, res) => {
  const user = {
    isLoggedIn: false,
    id: 0
  }

  if (req.isAuthenticated()) {
    user.id = req.user.id;
    user.isLoggedIn = true;
  }
  res.json({user: user});
});


module.exports = router;
