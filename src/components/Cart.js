import React from 'react'
import styles from './Cart.module.css'

export default function Cart() {
  return (
    <>
        <div className={styles.cart}>
            <img src="Images\cartIsEmpty.png" alt="cart is empty" />
            <p>OOPS ! Your cart is empty.</p>
        </div>
    </>
  )
}
