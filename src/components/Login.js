import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        THis Field is Require!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setpassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setloading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          setloading(false);
        });
    } else {
      setloading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/profile' />;
  }

  return (
    <div className='col-md-12'>
      <div className='card card-container'>
        <img
          src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
          alt='prifile img'
          className='profile-img-card'
        />
        <Form onSubmit={handleLogin} ref={form}>
          <div className='form-group'>
            <label>Username</label>
            <Input
              type='text'
              className='form-control'
              name='username'
              value={username}
              onChange={onChangeUsername}
              validation={[required]}
            ></Input>
          </div>

          <div className='form-group'>
            <label>Password</label>
            <Input
              type='password'
              className='form-control'
              name='password'
              value={password}
              onChange={onChangePassword}
              validation={[required]}
            ></Input>
          </div>

          <div className='form-group'>
            <button className='btn btn-primary btn-block' disabled={loading}>
              {loading && (
                <span className='spinner-border spinner-border-sm'></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {message}
              </div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn}></CheckButton>
        </Form>
      </div>
    </div>
  );
};

export default Login;
