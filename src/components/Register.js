import React from 'react'
import './Register.css'

export default function Register() {
  return (
    <>
        <div className="body">
            <div className="heading">
                <h3>Register</h3>
            </div>
            <div className="name">
                <label htmlFor="n">
                    <span>Name</span>
                    <input type="text" placeholder='Enter name' id='n'/>
                </label>
            </div>
            <div className="email-id">
                <label htmlFor="e-m">
                    <span>Email</span>
                    <input type="email" name="" id="e-m" placeholder='Enter Email'/>
                </label>
            </div>
            <div className="pass">
                <label htmlFor="pass">
                    <span>Password</span>
                    <input type="password" name="" id="pass" placeholder='Create password'/>
                </label>
            </div>
            <div className="phone-no">
                <label htmlFor="p-no">
                    <span>Phone No</span>
                    <input type="number" name="" id="p-no" placeholder='Enter phone-no'/>
                </label>
            </div>
            <div className="button">
                <button>Register</button>
            </div>
        </div>
    </>
  )
}
