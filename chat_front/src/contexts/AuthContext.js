import React, { createContext, useCallback, useReducer } from 'react';
import { AuthInitialState, AuthReducer } from '../reducers/AuthReducer';
import AuthActions from '../actions/AuthActions';
import { fetchWtoken } from '../helpers/fetch';
import { types } from '../types/types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [AuthState, AuthDispatch] = useReducer(AuthReducer, AuthInitialState);

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      AuthDispatch({
        type: types.AuthRenew,
        payload: {
          uid: null,
          name: null,
          email: null,
          checking: false,
          logged: false,
        },
      });

      return false;
    }

    const response = await fetchWtoken('auth/renew');

    if (response.ok) {
      localStorage.setItem('token', response.token);

      const { user } = response;

      AuthDispatch({
        type: types.AuthRenew,
        payload: {
          uid: user.uid,
          name: user.name,
          email: user.email,
          checking: false,
          logged: true,
        },
      });

      return true;
    } else {
      AuthDispatch({
        type: types.AuthRenew,
        payload: {
          uid: null,
          name: null,
          email: null,
          checking: false,
          logged: false,
        },
      });

      return false;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        AuthState,
        AuthDispatch,
        AuthActions: { ...AuthActions, verifyToken },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
