// !Authentication service
// register(): POST {username, email, password}
// login(): POST {username, password} & save JWT to Local Storage
// logout(): remove JWT from Local Storage
import axios from "axios";

//api url
// const API_URL = `http://localhost/8080/api/auth/`;
const API_URL = `http://localhost/3000/api/auth/`;

// for register page
const register = (userName, email, password) => {
  return axios.post(API_URL + "signup", { userName, password, email });
};

// for log in
const login = (userName, password) => {
  return axios
    .post(API_URL + "signin", {
      userName,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

//for logout
const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
