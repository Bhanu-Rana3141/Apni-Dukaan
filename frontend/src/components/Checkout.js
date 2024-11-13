import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Checkout.module.css'
import Cart from './Cart'

export default function Checkout() {
  return (
    <>  
        <div className={styles.navbar}>
            <Link to="/"><img className={styles.logo} src="\images\logo.png" alt="logo" /></Link>
        </div>


        {/*
        1. Delivery Address 
        2. Cart Items
        3. Payment Options
        */}
        <div className={styles.checkoutContainer}>
            <div className={styles.deliveryAddress}>
                <h4>1. DELIVERY ADDRESS</h4>
            </div>
            <div><Cart/></div>
            <div></div>
        </div>   
    </>
  )
}
