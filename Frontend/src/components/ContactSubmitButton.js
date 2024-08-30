import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ContactSubmitButton.module.css'

export default function ContactSubmitButton({clickHandler}) {
  return (
    <div className={styles.submitButton}>
      <Link to=""><button>{clickHandler}</button></Link>
    </div>
  );
}
