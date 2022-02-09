// (register/login/logout actions)

// => This is creator for actions related to authentication.
// => We’re gonna import AuthService to make asynchronous HTTP request
// => with trigger one or more dispatch in the result.

import {
  REGISTER_SUCESS,
  LOGIN_SUCESS,
  LOGOUT,
  LOGIN_FAIL,
  REGISTER_FAIL,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (username, email, password) => (dispatch) => {
  AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

// register()

// calls the AuthService.register(username, email, password)
// dispatch REGISTER_SUCCESS and SET_MESSAGE if successful
// dispatch REGISTER_FAIL and SET_MESSAGE if failed
// – login()

// calls the AuthService.login(username, password)
// dispatch LOGIN_SUCCESS and SET_MESSAGE if successful
// dispatch LOGIN_FAIL and SET_MESSAGE if failed
