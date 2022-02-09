import React, { useEffect, useState } from "react";
import userService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState();

  useEffect(() => {
    userService
      .getPublicContent()
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      });
  }, []);
  return (
    <div className='container'>
      <header className='jumbotron'></header>
      <h3>{content}</h3>
    </div>
  );
};

export default Home;
