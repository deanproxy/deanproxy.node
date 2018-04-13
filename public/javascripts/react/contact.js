import React from 'react';
import ReactDOM from 'react-dom';
import {ApiTypes, ApiHandler} from './data';
import Alert from './alert';

class Contact extends React.Component {
  constructor() {
    super();

    this.submit = this.submit.bind(this);
  }

  submit(evt) {
    evt.preventDefault();
    const from = document.getElementById('email');
    const message = document.getElementById('message');

    const email = {
      email: from.value,
      message: message.value
    }
    ApiHandler.post(ApiTypes.EMAIL, email)
      .then(response => {
        from.value = '';
        message.value = '';
        ReactDOM.hydrate(<Alert type="success" header="Thanks!" message="I received your e-mail. Cross your fingers it doesn't wind up in spam."/>,
          document.getElementById('react-alert'));
      }).catch(response => {
        ReactDOM.hydrate(<Alert type="danger" header="Sorry" message="An error occured while trying to send your message."/>,
          document.getElementById('react-alert'));
      });
  }

  render() {
    return (
      <div className="contact">
        <h1>Contact</h1>
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
