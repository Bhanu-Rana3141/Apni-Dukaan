import React from 'react'
import styles from './HeroLeftSectionSearchBar.module.css'

export default function HeroLeftSectionSearchBar() {
  return (
    <div className={styles.inputBlock}>
      <img className={styles.searchIcon} src="Images/search-icon.png" alt="search-icon" />
      <input className={styles.searchBar} type="text" placeholder="Search for products" />
    </div>
  )
}
