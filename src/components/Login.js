import React from 'react';
import ContactHeading from './ContactHeading';
import ContactInputField from './ContactInputField';
import ContactSubmitButton from './ContactSubmitButton';
import stylesA from "./Contact.module.css";
import stylesB from "./Login.module.css"

export default function Login() {
  return (
    <>
        <div className={stylesA.contactBody}>
            <ContactHeading heading="Sign in to Apni Dukaan"/>
            <ContactInputField label="Email" id="email" type="email" placeholder="Enter email Id"/>
            <div className={stylesB.password}>
                <ContactInputField label="Password" id="password" type="password" placeholder="Enter password"/>
            </div>
            <h4 className={stylesB.forgotPassword}>Forgot Password</h4>
            <ContactSubmitButton clickHandler="Login"/>
        </div>
    </>
  );
}
