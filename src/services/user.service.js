// !Data service
// public
// user
// moderator
// admin

// You can see that we add a HTTP header with the help of authHeader() 
// function when requesting authorized resource.

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `http://localhost:3000/api/test`;
// const API_URL = `http://localhost:8080/api/test`;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  //!localhost:8080/api/test/user/headers:Bearear + useraccessToken
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
