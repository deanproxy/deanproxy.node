const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

process.env.NODE_ENV = 'test';
const server = require('../app');

chai.use(http);

let id = 0;
let authenticated = true;
server.request.isAuthenticated = () => {
  return authenticated;
}

describe('Post', () => {

  it('shold show all posts at /posts', done => {
    chai.request(server).get('/posts')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.posts).to.be.a('object');
        expect(res.body.posts.total).to.be.a('number');
        expect(res.body.posts.posts).to.be.a('array');
        done();
      });
  });

  it('should allow limit and skip on /posts', done => {
    let skippedId = 0;
    chai.request(server).get('/posts?limit=1&skip=0')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.posts).to.be.a('object');
        expect(res.body.posts.total).to.be.a('number');
        expect(res.body.posts.posts).to.be.a('array');
        expect(res.body.posts.posts.length).to.equal(1);
        skippedId = res.body.posts.posts[0]._id;
      });

    chai.request(server).get('/posts?limit=1&skip=1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.posts).to.be.a('object');
        expect(res.body.posts.total).to.be.a('number');
        expect(res.body.posts.posts).to.be.a('array');
        expect(res.body.posts.posts.length).to.equal(1);
        expect(res.body.posts.posts[0]._id).to.not.equal(skippedId);
        done();
      });
  });

  it('should NOT allow a post to be made without logging in on /posts', done => {
    authenticated = false;
    chai.request(server).post('/posts')
      .send({'title': 'test', 'content': 'test'})
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should let me post to /posts after logging in', done => {
    authenticated = true;
    chai.request(server).post('/posts')
      .send({'title': 'test', 'content': 'test'})
      .end((err, res) => {
        if (err) {
          console.log(err.response.text);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('post');
        expect(res.body.post).to.be.a('object');
        id = res.body.post._id;
        done();
      });
  });

  it('should let me edit a post on /posts/:id', done => {
    chai.request(server).put(`/posts/${id}`)
      .send({'title': 'meow', 'tags':['meow', 'fan']})
      .end((err, res) => {
        if (err) {
          console.log(err.response.text);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('post');
        expect(res.body.post).to.be.a('object');
        done();
      });
  });

  it('should let me get a post on /posts/:id', done => {
    chai.request(server).get(`/posts/${id}`)
      .end((err, res) => {
        if (err) {
          console.log(err.response.text);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('post');
        expect(res.body.post).to.be.a('object');
        done();
      });
  });

  it('should let me get all posts by tag on /posts/tags/:tag', done => {

    chai.request(server).get('/posts/tags/meow')
      .end((err, res) => {
        if (err) {
          console.log(err.response.text);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('posts');
        expect(res.body).to.have.property('tag');
        expect(res.body.posts).to.be.a('object');
        expect(res.body.posts.posts).to.be.a('array');
        expect(res.body.tag).to.be.a('string');
        done();
      });
  });

  it('should give me a list of distinct tags', done => {
    chai.request(server).get('/posts/tags')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should let me delete a post on /posts/:id', done => {
    chai.request(server).delete(`/posts/${id}`)
      .send()
      .end((err, res) => {
        if (err) {
          console.log(err.response.text);
        }
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return a user object on /admin/user', done => {
    authenticated = false;
    chai.request(server).get('/admin/user')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.be.a('object');
        done();
      });
  });

});
