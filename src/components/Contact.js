import React from 'react';
import styles from './Contact.module.css'
import ContactHeading from './ContactHeading';
import ContactInputField from './ContactInputField';
import ContactTextArea from './ContactTextArea';
import ContactSubmitButton from './ContactSubmitButton';

export default function Contact() {
  return (
    <div className={styles.contactBody}>
      <ContactHeading heading="Send us a message"/>
      <ContactInputField label="Name" id='name' type="text" placeholder="Name" />
      <ContactInputField label="Email" id='email' type="email" placeholder="E-mail" />
      <ContactTextArea label="Message" id='textArea' placeholder="Write a message." />
      <ContactSubmitButton clickHandler="Submit"/>
    </div>
  );
}
