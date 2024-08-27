import React from 'react';
import styles from './ContactInputField.module.css'

export default function ContactInputField({ label, type, placeholder, id}) {
  return (
    <div>
      <label htmlFor={id}>
        <p className={styles.label}>{label}</p>
        <input className={styles.input} type={type} id={id} placeholder={placeholder} />
      </label>
    </div>
  );
}
