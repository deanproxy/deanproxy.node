import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter as Router, IndexRoute, Route} from 'react-router-dom';

import Layout from './layout';
import Login from './login';
import Code from './code';
import Music from './music';
import Contact from './contact';
import Show from './show';
import Index from './index';

import AdminIndex from './admin-index';
import Edit from './edit';

hydrate((
  <Router>
     <div>
       <Route path="/">
          <div>
            <Route path="posts"   component={Index}/>
            <Route path="posts/tags/:tag" component={Index}/>
            <Route path="login"   component={Login}/>
            <Route path="contact" component={Contact}/>
            <Route path="code"    component={Code}/>
            <Route path="music"   component={Music}/>
            <Route path="posts/:year/:month/:day/:name" component={Show}/>
            </div>
       </Route>

       <Route path="/admin">
       <div>
         <IndexRoute component={AdminIndex}/>
         <Route path="new" component={Edit}/>
         <Route path="edit/:id" component={Edit}/>
         </div>
       </Route>
    </div>
  </Router>
), document.getElementById('react-content'));
