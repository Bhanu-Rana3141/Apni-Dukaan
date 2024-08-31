import React from 'react';
import styles from './NavbarLinks.module.css';
import { Link } from 'react-router-dom';

const NavbarLinks = ({ isMobileMenuOpen }) => {
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
      {navbarLinks.map((link) => (<li key={link.path}><Link to={link.path} className={styles.links}>{link.name}</Link></li>))}
      <li><Link to='/cart'><img className={styles.cartIcon} src="Images/cart.png" alt="Shopping Cart" /></Link></li>
    </ul>
  );
};

export default NavbarLinks;
