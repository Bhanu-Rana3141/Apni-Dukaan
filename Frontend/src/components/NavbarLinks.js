import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavbarLinks.module.css';

const NavbarLinks = ({ isMobileMenuOpen, openModal, isLoggedIn, onLogout }) => {

  const navbarLinks = isLoggedIn
    ? [
        { name: 'Home', path: '/' },
        { name: 'Categories', path: '/categories' },
        { name: 'Contact', path: '/contact' },
        { name: 'Sign Out', path: '/signout', isButton: true, onClick: onLogout },
        { name: 'Cart', path: '/cart'}
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Categories', path: '/categories' },
        { name: 'Contact', path: '/contact' },
        { name: 'Login', path: '/login', isButton: true, onClick: () => openModal('login') },
        { name: 'Register', path: '/register', isButton: true, onClick: () => openModal('register') },
        { name: 'Cart', path: '/cart'}
      ];

  return (
    <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
      {navbarLinks.map((link) => (
        <li key={link.path}>
          {link.isButton ? (
            <button className={styles.links} onClick={link.onClick}>
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
