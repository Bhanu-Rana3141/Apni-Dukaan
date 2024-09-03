// NavbarLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavbarLinks.module.css';

const NavbarLinks = ({ isMobileMenuOpen, openModal }) => {
  const navbarLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
    { name: 'Cart', path: '/cart' }
  ];

  return (
    <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
      {navbarLinks.map((link) => (
        <li key={link.path}>
          {link.name === 'Login' || link.name === 'Register' ? (
            <button 
              className={styles.links} 
              onClick={() => openModal(link.name.toLowerCase())}
            >
              {link.name}
            </button>
          ) : (
            <Link to={link.path} className={styles.links}>{link.name}</Link>
          )}
        </li>
      ))}
      <li>
        <Link to='/cart'>
          <img className={styles.cartIcon} src="Images/cart.png" alt="Shopping Cart" />
        </Link>
      </li>
    </ul>
  );
};

export default NavbarLinks;
