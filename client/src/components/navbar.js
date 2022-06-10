import React from 'react';

import { NavLink } from 'react-router-dom';

export const Navbar = (props) => {
  let button;
  let createButton;
  if (!props.isLoggedIn) {
    button = (
      <>
        <NavLink className="nav-link" href="#" to="/login">
          Log in
        </NavLink>
        <NavLink className="nav-link" href="#" to="/signup">
          Sign up
        </NavLink>
      </>
    );
  } else {
    button = (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a className="nav-link" href="#" onClick={props.handleLogOut}>
        Log Out
      </a>
    );
    createButton = (
      <NavLink className="nav-link" to="/create">
        Create Note
      </NavLink>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-5 fs-2">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link active" aria-current="page" to="/">
              Home
            </NavLink>
            {createButton}
          </div>
          <div className="navbar-nav ms-auto">{button}</div>
        </div>
      </div>
    </nav>
  );
};
