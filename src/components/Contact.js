import React from 'react'
import './Contact.css'

export default function Contact() {
  return (
    <>
        <div className="body">

        <div className="heading">
                <h3>Send us a message</h3>
            </div>

            <div className="name">
                <label htmlFor="n">
                    <span>Name</span>
                    <input type="text" placeholder='Name' id='n'/>
                </label>
            </div>

            <div className="email">
                <label htmlFor="e-m">
                    <span>Email</span>
                    <input type="email" className='contact-email' placeholder='E-mail' id='e-m'/>
                </label>
            </div>

            <div className="textarea">
                <label htmlFor="textArea">
                    <span id='textarea-msg'>Message</span>
                    <textarea name="" id="textArea" placeholder='write a message.'></textarea>
                </label>
            </div>

            <div className="contact-submit-button">
                <button>Submit</button>
            </div>
        </div>

    </>
  )
}
