const chai = require('chai');
const http = require('chai-http');
const cheerio = require('cheerio');
const moment = require('moment');
const expect = chai.expect;

process.env.NODE_ENV = 'test';
const server = require('../app');

chai.use(http);

let post = {};
let authenticated = true;
server.request.isAuthenticated = () => {
  return authenticated;
}

describe('Post', () => {

  it('shold show all posts at /posts', done => {
    chai.request(server).get('/posts')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        const $ = cheerio.load(res.text);
        expect($('#react-content').length).to.equal(1);
        done();
      });
  });

  it('should allow limit and skip on /posts', done => {
    let skippedId = 0;
    chai.request(server).get('/posts?limit=1&skip=0')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        const $ = cheerio.load(res.text);
        expect($('#react-content').length).to.equal(1);
        done();
        // skippedId = res.body.posts.posts[0]._id;
      });
  });

  it('should NOT allow a post to be made without logging in on /posts', done => {
    authenticated = false;
    chai.request(server).post('/posts')
      .send({'title': 'test', 'content': 'test'})
      .end((err, res) => {
        expect(res).to.redirect;
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
        post = res.body.post;
        done();
      });
  });

  it('should let me edit a post on /posts/:id', done => {
    chai.request(server).put(`/posts/${post._id}`)
      .send({'title': 'meow', 'tags':['meow', 'fan']})
      .end((err, res) => {
        if (err) {
          console.log(err.response.text);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('post');
        expect(res.body.post).to.be.a('object');
        post = res.body.post;
        done();
      });
  });

  it('should let me get a post on /posts/:year/:month/:day/:name', done => {
    const m = moment(post.createdAt);
    const url = `/posts/${m.format('YYYY')}/${m.format('MM')}/${m.format('DD')}/${post.name}`;
    chai.request(server).get(url)
      .end((err, res) => {
        if (err) {
          console.log(err.response.text);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        const $ = cheerio.load(res.text);
        const root = $('#react-content');
        expect(root.find('.post').length).to.equal(1);
        expect(root.find('article header h1').text()).to.equal('meow');
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
        expect(res).to.be.html;
        const $ = cheerio.load(res.text);
        const root = $('#react-content');
        expect(root.find('.post').length).to.not.equal(0);
        expect(root.find('.post:first-child article header h1').text()).to.equal(post.title);
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
    chai.request(server).delete(`/posts/${post._id}`)
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
