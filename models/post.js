const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  name: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
  commentsDisabled: { type: Boolean, default: true },
});

PostSchema.methods.previous = function() {
  return new Promise((res, rej) => {
    this.model('Post')
      .findOne({createdAt: { $gt: this.createdAt }}, null, {sort: 'createdAt'}, (err, post) => {
        if (err) {
          rej(err);
        } else {
          res(post);
        }
      });
  });
}
PostSchema.methods.next = function() {
  return new Promise((res, rej) => {
    this.model('Post')
      .findOne({createdAt: { $lt: this.createdAt }}, null, {sort: {createdAt:-1}}, (err, post) => {
        if (err) {
          rej(err);
        } else {
          res(post);
        }
      });
  });
}
PostSchema.methods.urlPath = function() {
  const m = moment(this.createdAt);
  return `/posts/${m.format('YYYY')}/${m.format('MM')}/${m.format('DD')}/${this.name}`;
}

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
