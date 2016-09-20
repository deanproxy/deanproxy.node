const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  name: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
  commentsDisabled: { type: Boolean, default: true },
});

PostSchema.methods.previous = function(callback) {
  return this.model('Post')
    .find({createdAt: { $gt: this.createdAt }}, 'title', {sort: {createdAt:-1}}, callback);
}
PostSchema.methods.next = function(callback) {
  return this.model('Post')
    .findOne({createdAt: { $lt: this.createdAt }}, 'title', {sort: {createdAt:-1}}, callback);
}

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
