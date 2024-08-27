import React from 'react'
import styles from './ContactHeading.module.css';

export default function ContactHeading({heading}) {
  return (
    <>
        <div className={styles.heading}>
            <h3>{heading}</h3>
        </div>
    </>
  )
}
