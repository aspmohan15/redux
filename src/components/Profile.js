import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to='/login' />;
  }
  return (
    <div className='container'>
      <header className='jumbotron'>
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <div>
        <p>
          <strong>Token:</strong>
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
      </div>
      <div>
        <p>
          <strong>ID:</strong>
          {currentUser.id}
        </p>
      </div>
      <div>
        <strong>Email:</strong>
        {currentUser.email}
      </div>
      <div>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.role &&
            currentUser.role.map((role, index) => {
              <li key={index}>{role}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
