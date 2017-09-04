import React from 'react';

class Alert extends React.Component {
  render() {
    let iconClasses = 'fa ';
    switch (this.props.type) {
    case 'success':
      iconClasses += 'fa-check';
      break;
    case 'warning':
    case 'danger':
      iconClasses += 'fa-warning';
      break;
    default:
      break;
    }
    return (
      <div className={'alert alert-' + this.props.type} role="alert">
        <span className={iconClasses}></span> <strong>{this.props.header}</strong> {this.props.message}
      </div>
    );
  }
}

export default Alert;
