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
