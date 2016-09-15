const express = require('express');
const Post = require('../models/post');
const marked = require('marked');
const parallel = require('async/parallel');

const router = express.Router();

function authMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log(`oh shit. we're not authenticated.... ${req.isAuthenticated()}`);
  res.redirect(401, '/login');
}

router.get('/', (req, res) => {
  let q = Post.find({}, null, {sort: {'createdAt':-1}});
  if (req.query.limit) {
    q = q.limit(req.query.limit);
  }
  if (req.query.skip) {
    q = q.skip(req.query.skip);
  }
  q.exec((err, posts) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      Post.count((err, count) => {
        const obj = {
          total: count,
          posts: posts
        }
        res.json({posts: obj});
      })
    }
  });
});

router.get('/tags', (req, res) => {
  Post.find().distinct('tags', (err, tags) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json({tags: tags});
    }
  });
});

router.get('/tags/:tag', (req, res) => {
  Post.find({tags: {$in: [req.params.tag]}}, (err, posts) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json({tag: req.params.tag, posts: posts});
    }
  });
});

router.post('/', authMiddleware, (req, res) => {
  const post = new Post(req.body);
  post.save(err => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json({post: post.toObject()});
    }
  });
});

router.get('/latest', (req, res) => {
  Post.findOne({}, null, {sort: {'createdAt':-1}}, (err, post) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    Post.findOne({'createdAt': { $lt: post.createdAt }}, 'title', {sort: {createdAt:-1}},
      (err, response) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        }
        const p = post.toObject();
        if (response) {
          p.previous = response;
        }
        res.json({post: p});
      });
  });
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      /* get the previous and next posts */
      const p = post.toObject();
      parallel([
        function(callback) {
          /* how can we get the next post? currently we are always getting the first post */
          Post.find({createdAt: { $gt: post.createdAt }}, 'title', {sort: {createdAt:-1}},
          (err, response) => {
            if (response) {
              p.next = response[response.length-1];
            }
            callback(null, response);
          });
        },
        function(callback) {
          Post.findOne({createdAt: { $lt: post.createdAt }}, 'title', {sort: {createdAt:-1}},
            (err, response) => {
              if (response) {
                p.previous = response;
              }
              callback(null, response);
          });
        }
      ], function(err, results) {
        res.json({post: p});
      });
    }
  });
});

router.put('/:id', authMiddleware, (req, res) => {
  const post = req.body;
  Post.findByIdAndUpdate(
    req.params.id,
    {$set: post},
    {new:true},
    (err, post) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.json({post: post.toObject()});
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
