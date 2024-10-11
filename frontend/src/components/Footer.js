import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {

    const location = useLocation();

    const handleHomeClick = () => {
        if (location.pathname === "/") {
            window.scrollTo({
                top: 0,
            });
        }
    };

  return (
    <>
        <div className={styles.footer}>
            
            <div className={styles.footerContainer}>

                <div className={styles.linksContainer}>
                    <h4 className={styles.heading}>Quick Links</h4>
                    <Link onClick={handleHomeClick} className={styles.links} to="/">Home</Link>
                    <Link className={styles.links} to="/cart">Cart</Link>
                </div>

                <div className={styles.linksContainer}>
                    <h4 className={styles.heading}>Categories</h4>
                    <Link className={styles.links} to="/beverages">Beverages</Link>
                    <Link className={styles.links} to="/snacks">Snacks</Link>
                    <Link className={styles.links} to="/bakery">Bakery</Link>
                    <Link className={styles.links} to="/stationery">Stationery</Link>
                    <Link className={styles.links}  to="/dairy products">Dairy Products</Link>
                    <Link className={styles.links} to="/food grains & masalas">Food Grains & Masalas</Link>
                    <Link className={styles.links} to="/chocolates & toffees">Chocolates & Toffees</Link>
                    <Link className={styles.links} to="/vegetables">Vegetables</Link>
                    <Link className={styles.links} to="/toothpaste & brushes">Tooth Paste & Brushes</Link>
                </div>

                <div className={styles.linksContainer}>
                    <h4 className={styles.heading}>More Categories</h4>
                    <Link className={styles.links} to="/pooja items">Pooja Items</Link>
                    <Link className={styles.links} to="/slippers">Slippers</Link>
                    <Link className={styles.links} to="/mosquito repellents">Mosquito Repellents</Link>
                    <Link className={styles.links} to="/cleaning & household">Cleaning & Household</Link>
                    <Link className={styles.links} to="/skin care">Skin Care</Link>
                    <Link className={styles.links} to="/babby care">Baby Care</Link>
                    <Link className={styles.links} to="/hair care">Hair Care</Link>
                    <Link className={styles.links} to="/led bulbs">LED Bulbs</Link>
                    <Link className={styles.links} to="/dry fruits">Dry Fruits</Link>
                </div>

                <div className={styles.connectContainer}>
                    <h4 className={styles.heading}>Get in Touch</h4>
                    <Link to="https://github.com/Bhanu-Rana3141?tab=overview&from=2024-08-01&to=2024-08-25">
                        <img style={{height:'35px', position:'relative', top:'3px'}}  className={styles.connect} src="/Images/githubLogo.jpg" alt="GitHub" />
                    </Link>
                    <Link to="https://www.linkedin.com/in/bhanu-partap-singh-rana-875957272/">
                        <img className={styles.connect} src="/Images/linkedinLogo.png" alt="LinkedIn" />
                    </Link>
                    <Link to="https://www.instagram.com/bhanu.rana3141/">
                        <img className={styles.connect} src="/Images/instagramLogo.png" alt="Instagram" />
                    </Link>
                </div>
            </div>

            <div className={styles.copyRight}>
                <p>Copyright &copy; 2024, All Rights Reserved.</p>
            </div>

        </div>
    </>
  )
}