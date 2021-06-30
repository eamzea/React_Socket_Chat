import { types } from '../types/types';

export const AuthInitialState = {
  uid: '',
  checking: true,
  logged: false,
  name: '',
  email: '',
};

export const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case types.AuthLogin:
      return {
        ...state,
        ...action.payload,
      };
    case types.AuthRegister:
      return {
        ...state,
        ...action.payload,
      };
    case types.AuthRenew:
      return {
        ...state,
        ...action.payload,
      };
    case types.AuthLogout:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
