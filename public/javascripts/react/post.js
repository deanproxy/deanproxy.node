import React from 'react';
import {Link} from 'react-router';
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
    const createdAtEnglish = moment(post.createdAt).calendar();

    if (this.props.post.tags) {
      tags = this.props.post.tags.map((tag,idx) => {
        let comma = '';
        if (idx+1 !== this.props.post.tags.length) {
          comma = ', ';
        }
        return <Link key={tag} to={'/tags/' + tag}>{tag}{comma}</Link>;
      });
    }

    let footer = '';
    const currentTitle = this._makeUrlFromTitle(post.title);
    if (this.props.summarize) {
        const firstParagraph = post.htmlContent.match(/(.*)/);
        if (firstParagraph) {
          post.content = firstParagraph[0] +
            ` [[more...]](/#/posts/${post._id}/${currentTitle})`;
        }
    } else {
      let prev='', next='';
      if (post.previous) {
        const prevTitle = this._makeUrlFromTitle(post.previous.title);
        prev =
          <Link className="previous-link" to={`/posts/${post.previous._id}/${prevTitle}`}>
            <span className="fa fa-hand-o-left"></span>
            {post.previous.title}
          </Link>;
      }
      if (this.props.post.next) {
      const nextTitle = this._makeUrlFromTitle(post.next.title);
        next =
          <Link className="next-link" to={`/posts/${post.next._id}/${nextTitle}`}>
            {post.next.title}
            <span className="fa fa-hand-o-right"></span>
          </Link>;
      }

      footer = <footer>{prev}{next}</footer>;
    }

    /* NOTE: for the meantime, comments are disabled on all posts. */
    return (
      <div className="post">
        <article id={post._id}>
          <header>
            <h1><Link to={`/posts/${post._id}/${currentTitle}`}>{post.title}</Link></h1>
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
