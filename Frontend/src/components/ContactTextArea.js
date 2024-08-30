import React from 'react';
import styles from './ContactTextArea.module.css'


export default function ContactTextArea({ label, placeholder, id}) {
  return (
    <div>
      <label htmlFor={id}>
        <p className={styles.label}>{label}</p>
        <textarea className={styles.textArea} id={id} placeholder={placeholder}></textarea>
      </label>
    </div>
  );
}
