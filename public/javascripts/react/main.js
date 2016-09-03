import React from 'react';
import {render} from 'react-dom';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';

import Layout from './layout';
import Login from './login';
import Post from './post';
import Code from './code';
import About from './about';
import Index from './index';
import Music from './music';
import Contact from './contact';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Index}/>
      <Route path="login" component={Login}/>
      <Route path="contact" component={Contact}/>
      <Route path="code" component={Code}/>
      <Route path="about" component={About}/>
      <Route path="music" component={Music}/>
      <Route path="admin" component={Admin}/>
      <Route path="posts/:id" component={Post}/>
      <Route path="tags/:tag" component={Index}/>
    </Route>
  </Router>
), document.getElementById('react-content'));
