import React, { useState } from 'react'
import styles from './Checkout.module.css'
import DeliveryAddress from './DeliveryAddress'
import Cart from './Cart'

export default function Checkout() {

  const [savedAddress, setSavedAddress] = useState(null);


  // const customCartStyles = {
  //   container: {
  //     marginTop: '10px', // Remove margin from top
  //   },
  //   heading: {
  //     fontSize: '1rem', // Font size for "2. Order Summary"
  //     color: '#878787', // Font color for heading
  //   },
  //   headingText: '2. ORDER SUMMARY', // Custom text for heading
  // };

  return (

    <>
      <div className={styles.navbar}>
        <h2 className={styles.heading}>Checkout</h2>
      </div>


      {/*
        1. Delivery Address 
        2. Cart Items
        3. Payment Options
        */}
      <div className={styles.checkoutContainer}>
        <div className={styles.leftPart}>
            <DeliveryAddress setSavedAddress={setSavedAddress}/>
            
            <div className={styles.orderSummary}>
              <h3>2. ORDER SUMMARY</h3>
              {savedAddress && <Cart isCheckoutView/>}
            </div>
        </div>
      </div>
    </>
  )
}
