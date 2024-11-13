import React from 'react'
import styles from './Cart.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        toast.error("Failed to fetch cart items.");
      }
    };
    fetchCartItems();
  }, []);

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/update`, {
        productId,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCartItems(prevItems => prevItems.map(item => item.productId._id === productId ? { ...item, quantity } : item));
    } catch (error) {
      toast.error("Failed to update cart.");
    }
  }

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { productId },
      });
      setCartItems(prevItems => prevItems.filter(item => item.productId._id !== productId));
      toast.success("Item removed from cart.");
    } catch (error) {
      toast.error("Failed to remove item from cart.");
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  };

  const handleClick = () => {
    navigate('/checkout');
  }

  return (
    <>
      <div className={styles.cartContainer}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <img src='images\cartEmpty.png' alt='Cart empty'></img>
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <ul className={styles.cartList}>
              <h2 className={styles.heading}>Shopping Cart</h2>
              {cartItems.map(item => (
                <>
                  <hr></hr>
                  <li key={item.productId._id} className={styles.cartItem}>
                    <img src={`http://localhost:5000/images/${item.productId.image}`} alt={item.productId.name} />
                    <div className={styles.itemDetails}>
                      <p className={styles.productName}>{item.productId.name}</p>
                      <p className={styles.productDescription}>{item.productId.description}</p>
                      <p className={styles.productPrice}>Price: ₹{item.productId.price}</p>
                      <p>
                        <select
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId._id, Number(e.target.value))}
                        >   
                            <option value="1">Qty: 1</option>    
                            <option value="2">Qty: 2</option>    
                            <option value="3">Qty: 3</option>    
                            <option value="4">Qty: 4</option>    
                            <option value="5">Qty: 5</option>    
                            <option value="6">Qty: 6</option>    
                            <option value="7">Qty: 7</option>    
                            <option value="8">Qty: 8</option>    
                            <option value="9">Qty: 9</option>    
                            <option value="10">Qty: 10</option>
                        </select>
                        <span className={styles.deleteLink} onClick={() => handleRemoveItem(item.productId._id)}>Delete</span>
                      </p>
                    </div>
                  </li>
                </>
              ))}

              <hr></hr>
              <p className={styles.subtotal}>Subtotal ( {cartItems.length} {cartItems.length > 1 ? 'items' : 'item'}) : ₹{calculateTotalPrice()}</p>

            </ul>
            
            {/* price details part */}
            <div className={styles.priceDetails}>
              <div className={styles.priceDetailsHeading}>Price Details</div>

              <div className={styles.itemsPrice}>
                <div>Price ({cartItems.length} {cartItems.length > 1 ? 'items' : 'item'})</div>
                <div>₹{calculateTotalPrice()}</div>
              </div>
              
              <div className={styles.deliveryCharge}>
                <div>Delivery Charges</div>
                <div><del className={styles.deleteDeliveryCharges}>₹50</del>FREE</div>
              </div>

              <div className={styles.total}>
                <div>Subtotal</div>
                <div>₹{calculateTotalPrice()}</div>
              </div>

              <div className={styles.proceedToBuyBtn}>
                <button onClick={handleClick} className={styles.proceedButton}>Proceed to Buy</button>
              </div>
            </div>

          </>
        )}
      </div>
    </>
  )
}