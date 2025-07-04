

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '10px', background: '#333', color: '#fff' }}>
    <Link to="/" style={{ margin: '0 10px', color: '#fff' }}>Home</Link>
    <Link to="/login" style={{ margin: '0 10px', color: '#fff' }}>Login</Link>
    <Link to="/register" style={{ margin: '0 10px', color: '#fff' }}>Register</Link>
  </nav>
);

export default Navbar;
