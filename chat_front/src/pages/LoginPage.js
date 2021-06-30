import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import useForm from '../hooks/useForm';

const LoginPage = () => {
  const { AuthActions, AuthDispatch } = useContext(AuthContext);
  const [formState, setFormState, setValues] = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    const email = localStorage.getItem('email');

    if (email) {
      setValues(form => ({ ...form, email, remember: true }));
    }
  }, [setValues]);

  const toggleCheck = () =>
    setValues(Object.assign({}, formState, { remember: !formState.remember }));

  const handleSubmit = async ev => {
    ev.preventDefault();

    formState.remember
      ? localStorage.setItem('email', formState.email)
      : localStorage.removeItem('email', formState.email);

    const { email, password } = formState;

    try {
      const credentials = await AuthActions.login({ email, password });

      if (credentials) {
        AuthDispatch(credentials);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validForm = () =>
    formState.email.length > 0 && formState.password.length > 0;

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={handleSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Ingreso</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          value={formState.email}
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          onChange={setFormState}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          value={formState.password}
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          onChange={setFormState}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col" onClick={toggleCheck}>
          <input
            readOnly
            checked={formState.remember}
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="remember"
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          type="submit"
          className="login100-form-btn"
          disabled={!validForm()}
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
