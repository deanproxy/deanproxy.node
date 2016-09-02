const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const marked = require('marked');

function authMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(401, '/login');
}

router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.render('index', {posts: posts});
    }
  });
});

router.get('/tags', (req, res) => {
  Post.find().distinct('tags', (err, tags) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.json({tags: tags});
    }
  });
});

router.get('/tags/:tag', (req, res) => {
  Post.find({tags: {$in: [req.params.tag]}}, (err, posts) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.render('index', {tag: req.params.tag, posts: posts});
    }
  });
});

router.post('/', authMiddleware, (req, res) => {
  const post = new Post(req.body);
  post.htmlContent = marked(post.content);
  post.save(err => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.json(post.toObject());
    }
  });
});

router.put('/:id', authMiddleware, (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {$set: req.body},
    {new:true},
    (err, post) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.json(post.toObject());
      }
    });
});

router.delete('/:id', authMiddleware, (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
