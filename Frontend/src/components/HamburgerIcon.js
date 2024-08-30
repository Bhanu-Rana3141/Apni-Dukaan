import React from 'react'
import styles from './HamburgerIcon.module.css'

export default function HamburgerIcon({toggleMobileMenu}) {
  return (
    <>
        <div className={styles.hamburgerIcon} onClick={toggleMobileMenu}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
    </>
  )
}