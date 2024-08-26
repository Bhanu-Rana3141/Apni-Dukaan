import React from 'react'
import styles from './Logo.module.css'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <>
        <div className={styles.logo}>
            <Link to='/'><img  src="Images/1_Logo.png" alt="logo" /></Link>
        </div>
    </>
  )
}
