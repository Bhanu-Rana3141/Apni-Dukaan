import React from 'react'
import { useRef } from 'react';
import styles from './HeroLeftSectionSearchBar.module.css'

export default function HeroLeftSectionSearchBar() {

  const inputRef = useRef(null); 

  const handleIconClick = () => {
    inputRef.current.focus(); 
  };

  return (
    <div className={styles.inputBlock}>
      <img className={styles.searchIcon} src="Images/search-icon.png" alt="search-icon" onClick={handleIconClick}/>
      <input className={styles.searchBar} type="text" placeholder="Search for products" ref={inputRef} />
    </div>
  )
}
