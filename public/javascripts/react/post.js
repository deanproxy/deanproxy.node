import React from 'react';
import {Link} from 'react-router';

class Post extends React.Component {
  render() {
    let prev='', next='';
    if (this.props.post.previous) {
      prev = <Link className="previous-link" to={'/posts/' + this.props.post.previous._id}>Previous</Link>;
    }
    if (this.props.post.next) {
      prev = <Link className="next-link" to={'/posts/' + this.props.post.next._id}>Next</Link>;
    }
    return (
      <div className="posts-index">
        <article id={this.props.post._id}>
          <header><h2>{this.props.post.title}</h2></header>
          <section dangerouslySetInnerHTML={{__html: this.props.post.htmlContent}}/>
          <footer>
            {prev}
            {next}
          </footer>
        </article>
      </div>
    );
  }
}

export default Post;
