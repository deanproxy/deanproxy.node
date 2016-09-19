import React from 'react';
import {render} from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

import Layout from './layout';
import Login from './login';
import Code from './code';
import About from './about';
import Music from './music';
import Contact from './contact';
import Show from './show';
import Index from './index';

import AdminIndex from './admin-index';
import Edit from './edit';

render((
  <Router history={browserHistory}>
    <Route path="/">
      <Route path="posts"   component={Index}/>
      <Route path="posts/tags/:tag" component={Index}/>
      <Route path="login"   component={Login}/>
      <Route path="contact" component={Contact}/>
      <Route path="code"    component={Code}/>
      <Route path="about"   component={About}/>
      <Route path="music"   component={Music}/>
      <Route path="posts/:year/:month/:day/:name" component={Show}/>
    </Route>

    <Route path="/admin">
      <IndexRoute component={AdminIndex}/>
      <Route path="new" component={Edit}/>
      <Route path="edit/:id" component={Edit}/>
    </Route>
  </Router>
), document.getElementById('react-content'));
