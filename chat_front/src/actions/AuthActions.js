import handleErrors from '../helpers/handleErrors';
import { fetchWHtoken } from '../helpers/fetch';
import { types } from '../types/types';

const login = async ({ email, password }) => {
  try {
    const response = await fetchWHtoken(
      'auth/login',
      { email, password },
      'POST'
    );

    if (response.ok) {
      localStorage.setItem('token', response.token);
    } else {
      return handleErrors(response);
    }

    const { user } = response;

    return {
      type: types.AuthLogin,
      payload: {
        uid: user.uid,
        name: user.name,
        email: user.email,
        checking: false,
        logged: true,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

const register = async ({ name, email, password }) => {
  try {
    const response = await fetchWHtoken(
      'auth/new',
      { email, password, name },
      'POST'
    );

    if (response.ok) {
      localStorage.setItem('token', response.token);
    } else {
      return handleErrors(response);
    }

    const { user } = response;

    return {
      type: types.AuthRegister,
      payload: {
        uid: user.uid,
        name: user.name,
        email: user.email,
        checking: false,
        logged: true,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  localStorage.removeItem('token');

  return {
    type: types.AuthLogout,
    payload: {
      uid: null,
      name: null,
      email: null,
      checking: false,
      logged: false,
    },
  };
};

const AuthActions = {
  login,
  register,
  logout,
};

export default AuthActions;
