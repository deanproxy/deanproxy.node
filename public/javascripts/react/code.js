import React from 'react';
import Rest from 'rest';
import Mime from 'rest/interceptor/mime';
import ErrorCode from 'rest/interceptor/errorCode';
import moment from 'moment';

class Code extends React.Component {
  constructor() {
    super();
    this.rest = Rest.wrap(Mime, {mime: 'application/json'}).wrap(ErrorCode);
    this.api = 'https://api.github.com/repos/deanproxy/%s/commits';
    this.state = {
      repos: [
        { name: 'chatbot', message: '', committer: '', date: '' },
        { name: 'register', message: '', committer: '', date: '' },
        { name: 'eMail', message: '', committer: '', date: '' },
        { name: 'dlib', message: '', committer: '', date: '' }
      ]
    }
  }

  componentDidMount() {
    this.state.repos.forEach((repo,idx) => {
      const api = this.api.replace('%s', repo.name);
      this.rest(api).then(response => {
        console.log(response);
        const recent = response.entity[0].commit;
        this.state.repos[idx].message = recent.message;
        this.state.repos[idx].date = recent.committer.date;
        this.state.repos[idx].committer = recent.committer.name;
        this.setState(this.state);
      });
    });
  }

  render() {
    const repos = this.state.repos;
    return (
      <div className="code">
        <h1>Code</h1>
        <article>
          <header>
            <h3><a href="https://github.com/deanproxy/chatbot">chatbot</a></h3>
            <div className="github">
              on <time dateTime={moment(repos[0].date).format('YYYY-MM-DD')}>
                  {moment(repos[0].date).format('MMM Mo, YYYY')}, </time>
              <span className="author">{repos[0].committer} </span>
              made a commit --
              <span className="message"> {repos[0].message}</span>
            </div>
          </header>
          <section>
            <p>
              I wrote this for a pet project for our teams hipchat. Yes, there are
              bots for hipchat that do similar things, but I wanted to put it all
              together and also learn about bot programming.  It lets you remind
              yourself and others of stuff, runs builds, checks builds, tells jokes,
              makes memes, etc... I wrote it in Ruby.
            </p>
          </section>
        </article>
        <article>
          <header>
            <h3><a href="https://github.com/deanproxy/register">register</a></h3>
            <div className="github">
              on <time dateTime={moment(repos[1].date).format('YYYY-MM-DD')}>
                  {moment(repos[1].date).format('MMM Mo, YYYY')}, </time>
              <span className="author">{repos[1].committer} </span>
              made a commit --
              <span className="message"> {repos[1].message}</span>
            </div>
          </header>
          <section>
            <p>A silly app I made to help my family track our real-time expenses
               so we can see where we are with our account balance. Utilizing django,
               python, jQuery.</p>
          </section>
        </article>
        <article>
          <header>
            <h3><a href="https://github.com/deanproxy/eMail">eMail</a></h3>
            <div className="github">
              on <time dateTime={moment(repos[2].date).format('YYYY-MM-DD')}>
                  {moment(repos[2].date).format('MMM Mo, YYYY')}, </time>
              <span className="author">{repos[2].committer} </span>
              made a commit --
              <span className="message"> {repos[2].message}</span>
            </div>
          </header>
          <section>
            <p>
              Yes, it's a generic name. Yes, I have thought about changing it.
              Why did I name it this? Because. At the time, I was sick of obscure names
              for command line arguments. In hindsight, it makes sense to name it something
              simple, yet unique.
            </p>
            <p>
              What is it? It's a command line SMTP client that support TLS, SMTP AUTH, Attachments,
              encryption with GPG and some other basic features. It was created originally to be a
              very simple SMTP client for mailing reports by a nightly crontab. It has grown a bit,
              but has stayed pretty simple. It's written in C and depends on my own C library called
              dlib. I don't code on this project as much as I used to, but I still do keep it up to
              date by fixing bugs and doing the occasional feature enhancement.
            </p>
          </section>
        </article>
        <article>
          <header>
            <h3><a href="https://github.com/deanproxy/dlib">dlib</a></h3>
            <div className="github">
              on <time dateTime={moment(repos[3].date).format('YYYY-MM-DD')}>
                  {moment(repos[3].date).format('MMM Mo, YYYY')}, </time>
              <span className="author">{repos[3].committer} </span>
              made a commit --
              <span className="message"> {repos[3].message}</span>
            </div>
          </header>
          <section>
            <p>
              dlib is simply a library I use for my C projects. It has stuff like string buffers,
              linked lists, vectors, hash tables and some basic network type functions. It's all
              utility type stuff. I originally wrote it to accompany eMail. However, I have used
              it in some other projects that I have not published and died quickly. There isn't
              too much activity on this project.
            </p>
          </section>
        </article>
      </div>
    );
  }
}

export default Code;
