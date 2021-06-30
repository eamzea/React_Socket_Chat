import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import '../styles/auth.css';

const AuthRouter = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <Switch>
            <Route path="/auth/login" component={LoginPage} />
            <Route path="/auth/register" component={RegisterPage} />
            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AuthRouter;
