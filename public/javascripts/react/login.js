import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <a href="/auth/github" className="btn btn-block btn-social btn-github">
          <span className="fa fa-github"></span>
          login with github
        </a>
      </div>
    );
  }
}

export default Login;
