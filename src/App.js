// https://www.bezkoder.com/react-hooks-redux-login-registration-example/
import { useEffect, useState } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { Routes, Route, Router, Link } from "react-router-dom";
import store from "./store";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentuser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentuser) {
      setShowModeratorBoard(currentuser.roles.incudes("ROLE_MODERATOR"));
      setShowAdminBoard(currentuser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentuser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            {/* !// logo */}
            <Link to={"/"} className='navbar-brand'>
              Crazy clicks 24.7
            </Link>
            <div className='navbar-nav mr-auto'>
              <li className='navbar-item'>
                <Link to={"/home"} className='nav-link'>
                  Home
                </Link>
              </li>

              {/* modearator Dash Board */}

              {showModeratorBoard && (
                <li className='nav-item'>
                  <Link to={"/mod"} className='nav-link'>
                    Moderator Board
                  </Link>
                </li>
              )}

              {/* admin  board */}

              {showAdminBoard && (
                <li className='nav-item'>
                  <Link to={"/user"} className='nav-link'>
                    User
                  </Link>
                </li>
              )}

              {/* currentuser  board */}
              {currentuser && (
                <li className='nav-item'>
                  <Link to={"/user"} className='nav-link'>
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentuser ? (
              <div className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link to={"/profile"} className='nav-link'>
                    {currentuser.username}
                  </Link>
                </li>
                <li className='nav-item'>
                  <a href='/login' className='nav-link' onClick={logOut}>
                    Logout
                  </a>
                </li>
              </div>
            ) : (
              <div className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link to={"/login"} className='nav-link'>
                    Login
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link to={"/register"} className='nav-link'>
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <div className='container mt-3'>
            <Routes>
              <Route path={["/", "/home"]} component={<Home />} />
              <Route path='/login' component={<Login />} />
              <Route path='/register' component={<Register />} />
              <Route path='/profile' component={<Profile />} />
              <Route path='/user' component={<BoardUser />} />
              <Route path='/mod' component={<BoardModerator />} />
              <Route path='/admin' component={<BoardAdmin />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
