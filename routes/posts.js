const express = require('express');
const Post = require('../models/post');
const marked = require('marked');
const rss = require('rss');

const shared = require('./shared');

const Index = require('../public/javascripts/react/index').default;
const Show = require('../public/javascripts/react/show').default;

const React = require('react');
const ReactDOM = require('react-dom/server');

const router = express.Router();

const IndexElement = React.createFactory(Index);
const ShowElement = React.createFactory(Show);

marked.setOptions({
   sanitize: true
});

router.get('/', (req, res) => {
  var options = {
    skip: 0,
    limit: 5
  };

  if (req.query.limit) {
    options.limit = parseInt(req.query.limit, 10);
  }
  if (req.query.skip) {
    options.skip = parseInt(req.query.skip, 10);
  }

  shared.queryPosts(options).then(response => {
    const obj = {
      tag: req.params.tag || '',
      posts: response
    };
    if (req.accepts('html')) {
      res.render('index', {
        react: ReactDOM.renderToString(IndexElement(obj)),
        state: JSON.stringify(obj)
      });
    } else {
      res.json(obj);
    }
  }).catch(response => {
    console.log(response);
    throw response;
  });
});

router.get('/rss', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
      res.sendstatus(500);
      return;
    }
    const feed = new rss();
    posts.forEach(post => {
      feed.item({
        title: post.title,
        description: marked(post.content),
        url: `https://deanproxy.com${post.urlPath}`,
        date: post.createdAt
      });
    });
    res.set('Content-Type', 'text/xml');
    res.send(feed.xml());
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
  const options = {
    query: {
      tags: {$in: [req.params.tag]}
    },
    limit: 5,
    skip: 0
  };

  if (req.query.limit) {
    options.limit = req.query.limit;
  }
  if (req.query.skip) {
    options.skip = req.query.skip;
  }

  shared.queryPosts(options).then(response => {
    const obj = {
      tag: req.params.tag,
      posts: response
    };
    if (req.accepts('html')) {
      res.render('index', {
        react: ReactDOM.renderToString(IndexElement(obj)),
        state: JSON.stringify(obj)
      });
    } else {
      res.json(obj);
    }
  }).catch(response => {
    console.log(response);
    res.sendStatus(500);
  })
});

router.post('/', shared.authMiddleware, (req, res) => {
  const post = new Post(req.body);
  post.name = post.title.replace(/[^A-Za-z0-9-]/g, '-').toLowerCase();
  post.save(err => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json({post: post.toObject()});
    }
  });
});

router.get('/:year/:month/:day/:name', (req, res) => {
  Post.findOne({name: req.params.name}, (err, post) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      /* get the previous and next posts */
      const p = post.toObject();
      Promise.all([post.next(), post.previous()]).then(results => {
        p.next = results[0];
        p.previous = results[1];
        if (req.accepts('html')) {
          res.render('index', {
            react: ReactDOM.renderToString(ShowElement(p)),
            state: JSON.stringify(p)
          });
        } else {
          res.json(p);
        }
      }).catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
    }
  });
});

router.put('/:id', shared.authMiddleware, (req, res) => {
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

router.delete('/:id', shared.authMiddleware, (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
