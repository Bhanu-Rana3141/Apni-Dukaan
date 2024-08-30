import React from 'react'
import styles from './HeroSection.module.css'
import HeroLeftSection from './HeroLeftSection'
import HeroRightSection from './HeroRightSection'

export default function HeroSection() {
  return (
    <>
        <div className={styles.heroSection}>
            <HeroLeftSection />
            <HeroRightSection />
        </div>
    </>
  )
}
