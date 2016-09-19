import React from 'react';
import moment from 'moment';
import marked from 'marked';

class Post extends React.Component {
  _makeUrlFromTitle(title) {
    if (!title) {
      return title;
    }
    return title.replace(/[^A-Za-z0-9-]/g, '-').toLowerCase();
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
    const currentTitle = this._makeUrlFromTitle(post.title);
    if (this.props.summarize) {
        const firstParagraph = post.content.match(/(.*)/);
        if (firstParagraph) {
          post.content = firstParagraph[0] +
            ` [[more...]](/posts/${post._id}/${currentTitle})`;
        }
    } else {
      let prev='', next='';
      if (post.previous) {
        const prevTitle = this._makeUrlFromTitle(post.previous.title);
        prev =
          <a className="previous-link" href={`/posts/${post.previous._id}/${prevTitle}`}>
            <span className="fa fa-hand-o-left"></span>
            <span className="link-text">{post.previous.title}</span>
          </a>;
      }
      if (this.props.post.next) {
      const nextTitle = this._makeUrlFromTitle(post.next.title);
        next =
          <a className="next-link" href={`/posts/${post.next._id}/${nextTitle}`}>
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
            <h1><a href={`/posts/${post._id}/${currentTitle}`}>{post.title}</a></h1>
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
