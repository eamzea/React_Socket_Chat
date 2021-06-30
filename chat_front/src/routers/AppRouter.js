import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import ChatPage from '../pages/ChatPage';
import AuthRouter from './AuthRouter';
import Loading from '../components/Loading';

const AppRouter = () => {
  const {
    AuthState: { logged, checking },
    AuthActions: { verifyToken },
  } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (checking) {
    return <Loading />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute
            exact
            isAuthenticated={logged}
            path="/"
            component={ChatPage}
          />
          <PublicRoute
            isAuthenticated={logged}
            path="/auth"
            component={AuthRouter}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
