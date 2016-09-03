const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/logout', (req, res) => {
  res.logout();
  res.redirect('/posts');
});


module.exports = router;
