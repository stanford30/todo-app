import './App.css';
import axios from 'axios';
import { React, useState } from 'react';
import { Route, Routes, useResolvedPath } from 'react-router-dom';
import { OverView } from './components/overview';
import { Login } from './components/login';
import { Create } from './components/createNote';
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
      url: 'http://localhost:3000/api/v1/users/logout',
      withCredentials: true,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged out successfully!');
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
        <Route path="/Create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
