import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMagnifyingGlass , faXmark} from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css'

export default function Navbar() {

    const [isMobileMenuOpen, setMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenu(!isMobileMenuOpen);
    }

  return (
    <>
        <div className={styles.navbar}>
            <div className={styles.logoParent}>
                <Link to="/"><img className={styles.logo} src="\images\logo.png" alt="logo" /></Link>
            </div>

            <div className={styles.searchParent}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                <input className={styles.searchBar} type="text" placeholder='Search Products' />
            </div>

            <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ""}`}>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <div className={styles.cart}>
                    <Link to="/cart" className={styles.cartText}>Cart</Link>
                    <Link to="/cart"><img className={styles.cartIcon} src="\images\cart.png" alt="cart" /></Link>
                </div>
            </div>

            <div className={styles.hamburgerIcon} onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? (
                    <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} />
                ) : (
                    <>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                    </>
                )}
            </div>

        </div>
    </>
  )
}
