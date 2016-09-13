import React from 'react';
import {Link} from 'react-router';

class Paginate extends React.Component {
  constructor() {
    super();
    this.skip = 0;
    this.limit = 1;
    this.total = 1;
  }

  _setProps(props) {
    this.skip = parseInt(props.skip, 10) || 0;
    this.limit = parseInt(props.limit, 10) || 1;
    this.total = props.total<this.limit ? this.limit : parseInt(props.total, 10);
  }

  componentWillReceiveProps(props) {
    this._setProps(props);
  }

  componentDidMount() {
    this._setProps(this.props);
  }

  render() {
    let pages = Math.round(this.total / this.limit);
    let page = (this.skip + this.limit) / this.limit;

    let prevLink = <span className="fa fa-hand-o-left"></span>;
    let nextLink = <span className="fa fa-hand-o-right"></span>;
    if (page > 1) {
      const skipTo = this.skip - this.limit;
      prevLink = <Link to={`${this.props.url}?skip=${skipTo}`}><span className="fa fa-hand-o-left"></span></Link>;
    }
    if (page !== pages) {
      const skipTo = this.skip + this.limit;
      nextLink = <Link to={`${this.props.url}?skip=${skipTo}`}><span className="fa fa-hand-o-right"></span></Link>;
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
