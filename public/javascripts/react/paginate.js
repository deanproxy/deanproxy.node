import React from 'react';
import {Link} from 'react-router';

class Paginate extends React.Component {
  componentDidMount() {
  }

  render() {
    const skip = this.props.skip || 0;
    const limit = this.props.limit || 1;
    const total = this.props.total<limit ? limit : this.props.total;

    let pages = total / limit;
    let page = (skip + limit) / limit;

    let prevLink = 'previous';
    let nextLink = 'next';
    if (page > 1) {
      prevLink = <Link to={'/posts?skip=' + (skip - limit)}>previous</Link>;
    }
    if (page !== pages) {
      nextLink = <Link to={'/posts?skip=' + (skip + limit)}>next</Link>;
    }

    return(
      <div className="paginate">
        <span className="previous">{prevLink}</span>
        <span className="location"> page {page} of {pages} </span>
        <span className="next">{nextLink}</span>
      </div>
    );
  }
}

export default Paginate;
