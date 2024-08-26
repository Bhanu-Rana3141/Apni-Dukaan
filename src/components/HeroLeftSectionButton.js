import React from 'react'
import styles from './HeroLeftSectionButton.module.css'
import { Link } from 'react-router-dom'

export default function HeroLeftSectionButton() {
  return (
    <div className={styles.getStartedButton}>
      <Link to="/categories">
        <button>Get Started</button>
      </Link>
    </div>
  )
}
