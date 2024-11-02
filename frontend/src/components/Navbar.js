import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMagnifyingGlass , faXmark} from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css'
import { AuthContext } from '../context/AuthContext'; 
import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {

    const { authState, logout } = useContext(AuthContext); // Destructuring authState and logout from AuthContext
    const [isMobileMenuOpen, setMobileMenu] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenu(!isMobileMenuOpen);
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle logout and redirect
    const handleLogout = () => {
        logout(); 
        setDropdownOpen(false); 
        navigate('/login'); 
        toast.success('Successfully logged out!');
    };
      
    // Redirect to the All Products page to search products
    const handleSearchClick = () => {
        navigate('/allproducts/search');  
    };

    return (
    <>
        <div className={styles.navbar}>
            <div className={styles.logoParent}>
                <Link to="/"><img className={styles.logo} src="\images\logo.png" alt="logo" /></Link>
            </div>

            <div className={styles.searchParent}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                <input className={styles.searchBar} type="text" placeholder='Search Products' onClick={handleSearchClick}/>
            </div>

            <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ""}`}>
                <Link to="/">Home</Link>
                <div className={styles.cart}>
                    <Link to="/cart" className={styles.cartText}>Cart</Link>
                    <Link to="/cart"><img className={styles.cartIcon} src="\images\cart.png" alt="cart" /></Link>
                </div>

                {/* Conditional Rendering Based on Auth State */}
                {authState.user ? (
                    <div className={styles.userMenu} ref={dropdownRef}>
                        <button className={styles.userProfile} onClick={toggleDropdown}>
                            <FaUserCircle className={styles.userIcon} size={38} />
                        </button>
                        {dropdownOpen && (
                            <div className={styles.dropdown}>
                                <p className={styles.welcomeText}>Hello, {authState.user.name}!</p>
                                <Link to="/profile" className={styles.dropdownLink}>My Profile</Link>
                                <Link to="/orders" className={styles.dropdownLink}>My Orders</Link>
                                <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login"><button className={styles.loginButton}>Login</button></Link>
                )}
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
