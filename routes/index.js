const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
  res.render('index.html');
});

router.get('/login', (req, res) => {
  res.render('login');
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
