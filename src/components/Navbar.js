import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from './Logo';
import NavbarLinks from './NavbarLinks';
import HamburgerIcon from './HamburgerIcon';

export default function Navbar() {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={styles.navbar}>
      <Logo/>
      <NavbarLinks isMobileMenuOpen={isMobileMenuOpen}/>
      <HamburgerIcon toggleMobileMenu = {toggleMobileMenu}/>
    </div>
  );
}
