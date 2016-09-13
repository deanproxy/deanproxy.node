import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

class Post extends React.Component {
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
    if (this.props.summarize) {
        const firstParagraph = post.htmlContent.match('<p>(.*)</p>');
        if (firstParagraph) {
          post.htmlContent = firstParagraph[0] + ` <a href="/#/posts/${post._id}">more...</a>`;
        }
    } else {
      let prev='', next='';
      if (post.previous) {
        prev =
          <Link className="previous-link" to={'/posts/' + post.previous._id}>
            <span className="fa fa-hand-o-left"></span>
            {post.previous.title}
          </Link>;
      }
      if (this.props.post.next) {
        next =
          <Link className="next-link" to={'/posts/' + post.next._id}>
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
            <h1><Link to={`/posts/${post._id}`}>{post.title}</Link></h1>
            <time dateTime={createdAt}>{createdAtEnglish}</time>
            <div className="tags">{tags}</div>
          </header>
          <section dangerouslySetInnerHTML={{__html: post.htmlContent}}/>
          {footer}
        </article>
      </div>
    );
  }
}

export default Post;
