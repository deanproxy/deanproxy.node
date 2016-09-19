const mongoose = require('mongoose');
const Post = require('./models/post');

mongoose.connect('mongodb://localhost/deanproxy');

Post.find({}, (err, posts) => {
  if (err) {
    throw err;
  }
  posts.forEach(post => {
    post.name = post.title.replace(/[^A-Za-z0-9-]/g, '-').toLowerCase();
    console.log(`New name: ${post.name}`);
    post.save();
  });
});
