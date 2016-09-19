const Post = require('../models/post');

exports.authMiddleware = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


exports.queryPosts = function(options) {
  let q = undefined;
  options = options || {};

  return new Promise((resolve, reject) => {
    if (!options.query) {
      q = Post.find({}, null, {sort: {createdAt:-1}});
    } else {
      q = Post.find(options.query, null, {sort: {createdAt:-1}});
    }

    if (options.limit) {
      q = q.limit(options.limit);
    }
    if (options.skip) {
      q = q.skip(options.skip);
    }

    q.exec((err, posts) => {
      if (err) {
        reject(err);
      } else {
        Post.count(options.query, (err, count) => {
          const obj = {
            skip: options.skip,
            limit: options.limit,
            total: count,
            posts: posts
          }
          resolve(obj);
        })
      }
    });
  });
}
