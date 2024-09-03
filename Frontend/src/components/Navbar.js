import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Logo from './Logo';
import NavbarLinks from './NavbarLinks';
import HamburgerIcon from './HamburgerIcon';
import Modal from './Modal'; 

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');   
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <div className={styles.navbar}>
      <Logo />
      <NavbarLinks 
        isMobileMenuOpen={isMobileMenuOpen} 
        openModal={openModal}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <HamburgerIcon toggleMobileMenu={toggleMobileMenu} />
      
      {isModalOpen && <Modal closeModal={closeModal} modalType={modalType} setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}
