import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import styles from './LoginSignup.module.css';

export default function Login() {

  const [rightPart, setRightPart] =  useState("login");  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const navigate = useNavigate();

 // change login page to sign up page   
  const signupHandler = () => {
    setRightPart("sign up");
  }

  // Input validation function
  const validateInputs = () => {
    if (rightPart === 'login') {
      if (!email) {
        toast.error("Please fill in the email address.");
        return false;
      }
      if (!email.includes('@') || !email.includes('.')) {
        toast.error("Email is not valid.");
        return false;
      }
      if (!password) {
        toast.error("Please fill in the password.");
        return false;
      }
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return false;
      }
    } else {
      if (!name) {
        toast.error("Please fill the name.");
        return false;
      }
      if (!email) {
        toast.error("Please fill the email address.");
        return false;
      }
      if (!email.includes('@') || !email.includes('.')) {
        toast.error("Please enter a valid email.");
        return false;
      }
      if (!password) {
        toast.error("Please fill the password.");
        return false;
      }
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return false;
      }
    }
    return true;
  }

  // handling login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateInputs()) {
        return; 
    }

    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        toast.success("Login successfull!");
        navigate('/home');
    }
    catch(error) {
        toast.error(error.response.data.message || "Invalid email or password.");        
    }
  }

  // handling signup submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateInputs()) {
        return; 
      }

    try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        toast.success("Registered successfully!"); 
        navigate('/home');
    }
    catch(error) {
        toast.error(error.response.data.message || "Please try again.");
    }
  }

  return (
    <>
        <div className={styles.loginSignupForm}>
            
            <div className={styles.leftPart}>
                <h1>Apni Dukaan</h1>
                <p>Your One-Stop Solution for Daily Essentials. Shop Now and Enjoy Effortless!</p>
            </div>
            
            {rightPart === 'login' ? (

                <div className={styles.rightPart}>
                    <input 
                        type="Email" 
                        placeholder='Enter email address ' 
                        required value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder='Enter password' 
                        required value={password} 
                        onChange={(e) => setPasssword(e.target.value)}
                    />
                    <button className={styles.loginButton} onClick={handleLogin}>Log in</button>
                    <p className={styles.dontHaveAccountPara}>Don't have an account ?</p>
                    <button className={styles.createAccount} onClick={signupHandler}>Create new Account</button>
                </div> 

            )  : 
                <div className={styles.rightPart}>

                    <div className={styles.newAccountHeading}>
                        Create a new Account
                    </div>

                    <input 
                        type="text" 
                        placeholder='Enter name' 
                        required 
                        value={name} 
                        onChange={ (e) => setName(e.target.value) }
                    />
                    <input 
                        type="Email" 
                        placeholder='Enter email address' 
                        required value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password" 
                        placeholder='Enter password'
                        required value={password} 
                        onChange={(e) => setPasssword(e.target.value)}
                    />
                    <button className={styles.loginButton} onClick={handleSignup}>Sign up</button>
                </div>
            }
        </div> 
    </>
  )
}
