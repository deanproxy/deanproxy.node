var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/posts');
});

router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/logout', (req, res) => {
  res.logout();
  res.redirect('/posts');
});


module.exports = router;
