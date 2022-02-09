import React, { useEffect, useState } from "react";
import USerService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState();
  useEffect(() => {
    USerService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.message.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className='container'>
      <header className='jumbotron'>
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardUser;
