const express = require('express');
const router = express.Router();
const Post = require('../models/post');


router.get('/', function(req, res) {
  res.json({})
});

router.post('/', (req, res) => {
  const post = new Post(req.body);
  post.save(err => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(post.toObject());
    }
  });
});

router.put('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.json(post.toObject());
    }
  });
});

router.delete('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.sendStatus(404);
    } else {
      post.remove();
      res.sendStatus(200);
    }
  });
});

module.exports = router;
