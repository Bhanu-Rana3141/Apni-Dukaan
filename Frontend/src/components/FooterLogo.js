import React from 'react'
import { Link } from 'react-router-dom'
import styles from './FooterLogo.module.css'

export default function FooterLogo() {
  return (
    <>
        <div className={styles.footerLogo}>
            <Link to="/"><img src="/Images/footerlogo.png" alt="logo" /></Link>
        </div>
    </>
  )
}
