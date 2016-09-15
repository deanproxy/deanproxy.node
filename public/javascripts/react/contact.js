import React from 'react';
import {ApiTypes, ApiHandler} from './data';

class Contact extends React.Component {
  constructor() {
    super();

    this.state = {
      sent: false,
      error: false
    }
    this.submit = this.submit.bind(this);
  }

  submit(evt) {
    evt.preventDefault();

    const email = {
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    }
    ApiHandler.post(ApiTypes.EMAIL, email)
      .then(response => {
        this.setState({sent: true, error: false});
      }).catch(response => {
        console.log(response);
        this.setState({sent: false, error: true});
      });
  }

  render() {
    let alertMessage = ''
    if (this.state.sent) {
      alertMessage = <div className="alert alert-success" role="alert"><span className="fa fa-check"></span> Message sent. Thanks!</div>;
    } else if (this.state.error) {
      alertMessage = <div className="alert alert-danger" role="alert"><span className="fa fa-warning"></span> There was a problem sending the message.</div>;
    }
    return (
      <div className="contact">
        <h1>Contact</h1>
        {alertMessage}
        <form onSubmit={this.submit}>
          <ul>
            <li>
              <input type="email" id="email" name="email" placeholder="your e-mail" required/>
            </li>
            <li>
              <textarea name="message" id="message" placeholder="what you gotta say?" required></textarea>
            </li>
            <li>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default Contact;
