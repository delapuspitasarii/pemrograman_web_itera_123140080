import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <h2>📚 BookManager</h2>
      <div>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Beranda
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => (isActive ? 'active' : '')}>
          Statistik
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;