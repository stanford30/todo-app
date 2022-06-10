import './App.css';
import axios from 'axios';
import { React, useState } from 'react';
import { Route, Routes, useResolvedPath } from 'react-router-dom';
import { OverView } from './components/overview';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { Create } from './components/createNote';
import { Update } from './components/updateNote';
import { Navbar } from './components/navbar';
import { showAlert } from './components/login';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);

  const handleLogOut = async (e) => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
      withCredentials: true,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged out successfully!');
      window.setTimeout(() => {
        window.location.assign('/');
      }, 500);
    }
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
      {/* <h1>Hello {user.name}</h1> */}
      <Routes>
        <Route exact path="/" element={<OverView user={user} />} />
        {/* <Route exact path="/" element={<OverView />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
