import React from 'react'
import './Login.css'

export default function Login() {
  return (
    <>
        <div className="body">
            <div className="heading">
                <h3>Sign in to Apni Dukaan</h3>
            </div>

            <div className="email">
                <label htmlFor="e-m">
                    <span>Email</span>
                    <input type="email" placeholder='E-mail' id='e-m'/>
                </label>
            </div>

            <div className="password">
                <label htmlFor="pass">
                    <span>Password</span>
                    <input type="password" placeholder='Password' id='pass'/>
                </label>
            </div>

            <div className="button">
                <button>Login</button>
            </div>

            <div className="forgot-password">
                <span>Forgot Password ?</span>
            </div>
        </div>
    </>
  )
}
