import React from 'react'
import { Link } from 'react-router-dom'
import styles from './FooterContactInfo.module.css'

export default function FooterContactInfo() {
  return (
    <>
        <div className={styles.getInTouchSection}>
            <h4>Get in Touch</h4>
            <Link to="https://github.com/Bhanu-Rana3141?tab=overview&from=2024-08-01&to=2024-08-25">
                <img className={styles.connectLogo} src="/Images/Github_logo.jpg" alt="GitHub" />
            </Link>
            <Link to="https://www.linkedin.com/in/bhanu-partap-singh-rana-875957272/">
                <img className={styles.connectLogo} src="/Images/Linkedin_logo.png" alt="LinkedIn" />
            </Link>
            <Link to="https://www.instagram.com/bhanu.rana3141/">
                <img className={styles.connectLogo} src="/Images/InstagramLogo.png" alt="Instagram" />
            </Link>
        </div>
    </>
  )
}
