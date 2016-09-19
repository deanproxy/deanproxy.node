import React from 'react';
import moment from 'moment';
import marked from 'marked';

class Post extends React.Component {
  _makeUrl(title, createdAt) {
    if (!title) {
      return title;
    }
    const m = moment(createdAt);
    const name = title.replace(/[^A-Za-z0-9-]/g, '-').toLowerCase();
    return `/posts/${m.format('YYYY')}/${m.format('MM')}/${m.format('DD')}/${name}`;
  }

  render() {
    let tags='';
    const post = this.props.post;

    const createdAt = moment(post.createdAt).format();
    const createdAtEnglish = moment(post.createdAt).format("dddd, MMMM Do YYYY");

    if (this.props.post.tags) {
      tags = this.props.post.tags.map((tag,idx) => {
        let comma = '';
        if (idx+1 !== this.props.post.tags.length) {
          comma = ', ';
        }
        return <a key={tag} href={'/posts/tags/' + tag}>{tag}{comma}</a>;
      });
    }

    let footer = '';
    const currentTitle = this._makeUrl(post.title, post.createdAt);
    if (this.props.summarize) {
        const firstParagraph = post.content.match(/(.*)/);
        const url = this._makeUrl(post.title, post.createdAt);
        if (firstParagraph) {
          post.content = firstParagraph[0] +
            ` [[more...]](${url})`;
        }
    } else {
      let prev='', next='';
      if (post.previous) {
        const prevTitle = this._makeUrl(post.previous.title, post.previous.createdAt);
        prev =
          <a className="previous-link" href={prevTitle}>
            <span className="fa fa-hand-o-left"></span>
            <span className="link-text">{post.previous.title}</span>
          </a>;
      }
      if (this.props.post.next) {
      const nextTitle = this._makeUrl(post.next.title, post.next.createdAt);
        next =
          <a className="next-link" href={nextTitle}>
            <span className="link-text">{post.next.title}</span>
            <span className="fa fa-hand-o-right"></span>
          </a>;
      }

      footer = <footer>{prev}{next}</footer>;
    }

    /* NOTE: for the meantime, comments are disabled on all posts. */
    return (
      <div className="post">
        <article id={post._id}>
          <header>
            <h1><a href={currentTitle}>{post.title}</a></h1>
            <time dateTime={createdAt}><span className="fa fa-calendar"></span> {createdAtEnglish}</time>
          </header>
          <section dangerouslySetInnerHTML={{__html: marked(post.content)}}/>
          <div className="tags"><span className="fa fa-tag"></span> {tags}</div>
          {footer}
        </article>
      </div>
    );
  }
}

export default Post;
