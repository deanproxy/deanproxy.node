import React from 'react';
import {hydrate, render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Layout from './layout';
import Login from './login';
import Music from './music';
import Contact from './contact';
import Show from './show';
import Index from './index';

import AdminIndex from './admin-index';
import Edit from './edit';

hydrate((
  <Router>
   <Switch>
      <Route exact path="/" component={Index}/>
      <Route exact path="/posts" component={Index}/>
      <Route path="/posts/tags/:tag" component={Index}/>
      <Route path="/posts/:year/:month/:day/:name" component={Show}/>
      <Route path="/login" component={Login}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/music" component={Music}/>
      <Route path="/admin" component={AdminIndex}/>
      <Route path="/admin/new" component={Edit}/>
      <Route path="/admin/edit/:id" component={Edit}/>
    </Switch>
  </Router>
), document.getElementById('react-content'));
