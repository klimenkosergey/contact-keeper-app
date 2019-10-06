import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AuthState from './context/auth/AuthState';
import ContactState from './context/contact/ContactState';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar';
import AlertList from './components/alerts/AlertList';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => (
  <AuthState>
    <ContactState>
      <AlertState>
        <Router>
          <Navbar />
          <div className='container'>
            <AlertList />
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <PublicRoute path='/register' component={Register} />
              <PublicRoute path='/login' component={Login} />
            </Switch>
          </div>
        </Router>
      </AlertState>
    </ContactState>
  </AuthState>
);

export default App;
