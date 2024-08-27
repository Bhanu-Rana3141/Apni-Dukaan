import React from 'react'
import stylesA from './Contact.module.css'
import stylesB from './Login.module.css'
import ContactHeading from './ContactHeading';
import ContactInputField from './ContactInputField';
import ContactSubmitButton from './ContactSubmitButton';

export default function Register() {
  return (
    <>
        <div className={stylesA.contactBody}>
            <ContactHeading heading="Register"/>
            <ContactInputField label="Name" id="name" type="name" placeholder="Enter name"/>
            <ContactInputField label="Email" id="email" type="email" placeholder="Enter email Id"/>
            <ContactInputField label="Mobile" id="phoneNo" type="phoneNo" placeholder="Enter number"/>
            <div className={stylesB.password}>
                <ContactInputField label="Password" id="password" type="password" placeholder="create password"/>
            </div>
            <ContactSubmitButton clickHandler="Register"/>
        </div>
    </>
  )
}
