import React from 'react'
import styles from './HeroLeftSection.module.css'
import HeroLeftSectionSearchBar from './HeroLeftSectionSearchBar'
import HeroLeftSectionButton from './HeroLeftSectionButton'


export default function HeroLeftSection() {

  return (
    <>
        <div className={styles.leftSection}>
            <h1>Welcome to Apni Dukaan</h1>
            <p>Your One-Stop Solution for Daily Essentials. Shop Now and Enjoy Effortless!</p>
            <div className={styles.inputClass}>
                <HeroLeftSectionButton />
                <HeroLeftSectionSearchBar />
            </div>
        </div>
    </>
  )
}