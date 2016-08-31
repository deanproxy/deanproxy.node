const chai = require('chai');
const http = require('chai-http');
const cheerio = require('cheerio');
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
        id = res.body._id;
        done();
      });
  });

  it('should let me edit a post on /posts/:id', done => {
    chai.request(server).put(`/posts/${id}`)
      .send({'title': 'meow'})
      .end((err, res) => {
        if (err) {
          console.log(err.response.text);
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

});
