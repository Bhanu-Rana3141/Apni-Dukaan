import React from 'react'
import './Cart.css'

export default function Cart() {
  return (
    <>
        <div className="cartEmptyImg">
            <img src="Images\cartIsEmpty.png" alt="cart is empty" />
            <p>OOPS ! Your cart is empty.</p>
        </div>
    </>
  )
}
