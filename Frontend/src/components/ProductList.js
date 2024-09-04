import React from 'react';
import styles from './ProductList.module.css';

export default function ProductList({ products }) {
  return (
    <div className={styles.productList}>
      {products.map(product => (
        <div key={product.id} className={styles.productItem}>
          <img src={`http://localhost:5000/images/${product.image}`} alt={product.name} />
          <h3>{product.productName}</h3>
          <p>{product.quantity}</p>
          <div className={styles.itemFooter}>
            <div className={styles.rupeeSymbolAndPrice}>
              <img style={{height : '16px', width:'auto'} } src="/Images/rupeeSymbol.png" alt="rupee symbol"/>
              <p>{product.price}</p>
            </div>
            <button className={styles.addToCart}>Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}
