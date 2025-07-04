

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      alert('Login successful');
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '20px' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
