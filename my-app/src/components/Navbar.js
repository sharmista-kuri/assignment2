import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you'll add styles in this file

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="logo">E-Shop</div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
