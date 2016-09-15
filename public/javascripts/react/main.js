import React from 'react';
import {render} from 'react-dom';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';

import Layout from './layout';
import Login from './login';
import Code from './code';
import About from './about';
import Music from './music';
import Contact from './contact';
import Show from './show';
import Index from './index';

import AdminIndex from './admin-index';
import AdminLayout from './admin-layout';
import Edit from './edit';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Index}/>
      <Route path="login" component={Login}/>
      <Route path="contact" component={Contact}/>
      <Route path="code" component={Code}/>
      <Route path="about" component={About}/>
      <Route path="music" component={Music}/>
      <Route path="posts/:id/:name" component={Show}/>
      <Route path="tags/:tag" component={Index}/>
    </Route>

    <Route path="/admin" component={AdminLayout}>
      <IndexRoute component={AdminIndex}/>
      <Route path="new" component={Edit}/>
      <Route path="edit/:id" component={Edit}/>
    </Route>
  </Router>
), document.getElementById('react-content'));
