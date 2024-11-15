import React from 'react'
import styles from './Checkout.module.css'
import DeliveryAddress from './DeliveryAddress'
import Cart from './Cart'

export default function Checkout() {

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
          <div className={styles.deliveryAddress}>
            <DeliveryAddress/>
            {/* <Cart customStyles={customCartStyles} buttonType='Place Order'/> */}
          </div>
        </div>
        <div className={styles.rightPart}>

        </div>
      </div>
    </>
  )
}
