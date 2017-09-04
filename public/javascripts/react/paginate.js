import React from 'react';

class Paginate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.skip = parseInt(this.props.skip, 10) || 0;
    this.limit = parseInt(this.props.limit, 10) || 1;
    this.total = this.props.total<this.limit ? this.limit : parseInt(this.props.total, 10);

    let pages = Math.round(this.total / this.limit);
    let page = (this.skip + this.limit) / this.limit;

    let prevLink = <span className="fa fa-hand-o-left"></span>;
    let nextLink = <span className="fa fa-hand-o-right"></span>;
    if (page > 1) {
      const skipTo = this.skip - this.limit;
      prevLink = <a href={`${this.props.url}?skip=${skipTo}`}><span className="fa fa-hand-o-left"></span></a>;
    }
    if (page !== pages) {
      const skipTo = this.skip + this.limit;
      nextLink = <a href={`${this.props.url}?skip=${skipTo}`}><span className="fa fa-hand-o-right"></span></a>;
    }

    return(
      <div className="paginate">
        <span className="previous">{prevLink}</span>
        <span className="location"> page: {page} of {pages} </span>
        <span className="next">{nextLink}</span>
      </div>
    );
  }
}

export default Paginate;
