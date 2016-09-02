const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  content: String,
  htmlContent: String,
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
  commentsDisabled: { type: Boolean, default: true },
  comments: [{ type: String }]
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
