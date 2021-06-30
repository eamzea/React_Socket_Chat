import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const RegisterPage = () => {
  const { AuthActions, AuthDispatch } = useContext(AuthContext);
  const [registerState, setRegisterState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target: { value, name } }) =>
    setRegisterState(Object.assign({}, registerState, { [name]: value }));

  const handleRegister = async ev => {
    ev.preventDefault();

    const { email, password, name } = registerState;

    try {
      const credentials = await AuthActions.register({ email, password, name });

      if (credentials) {
        AuthDispatch(credentials);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validForm = () =>
    registerState.email.length > 0 &&
    registerState.password.length > 0 &&
    registerState.name.length > 0;

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={handleRegister}
    >
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
          name="name"
          value={registerState.name}
          placeholder="Nombre"
          onChange={handleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          value={registerState.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          value={registerState.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          type="submit"
          className="login100-form-btn"
          disabled={!validForm()}
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};

export default RegisterPage;
