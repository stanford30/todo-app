import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LoginForm = (props) => {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form form--login" onSubmit={props.onSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              placeholder="you@example.com"
              required
            ></input>
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form__input"
              type="password"
              placeholder="••••••••"
              required
              minLength={'8'}
            ></input>
          </div>
          <div className="form__group">
            <button className="btn btn-lg btn-success">Login</button>
          </div>
        </form>
      </div>
    </main>
  );
};
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      localStorage.setItem('user', JSON.stringify(res.data.data.user));

      window.setTimeout(() => {
        window.location.assign('/');
      }, 1500);
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    // showAlert('error', err);
  }
};

export const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};
