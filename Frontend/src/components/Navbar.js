import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Logo from './Logo';
import NavbarLinks from './NavbarLinks';
import HamburgerIcon from './HamburgerIcon';
import Modal from './Modal'; 
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); 

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

  return (
    <div className={styles.navbar}>
      <Logo />
      <NavbarLinks 
        isMobileMenuOpen={isMobileMenuOpen} 
        openModal={openModal} 
      />
      <HamburgerIcon toggleMobileMenu={toggleMobileMenu} />
      
      {isModalOpen && <Modal closeModal={closeModal} modalType={modalType} />}
    </div>
  );
}
