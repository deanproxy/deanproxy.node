import React from 'react';

class Modal extends React.Component {
  render() {
    return (
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-footer">
            <button className="btn btn-default" data-dismiss="modal" onClick={this.props.onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={this.props.onSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
