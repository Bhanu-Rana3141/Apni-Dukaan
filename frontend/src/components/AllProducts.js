import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AllProducts.module.css';  

export default function AllProducts() {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products'); 
                setProducts(response.data);  
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className={styles.products}> 
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                products.map((product) => (
                    <div key={product._id} className={styles.productItem}>
                        <img className={styles.productImage} src={`http://localhost:5000/images/${product.image}`} alt={product.name} />
                        <h3 className={styles.productName}>{product.name}</h3>
                        <div className={styles.itemFooter}>
                            <p className={styles.productPrice}>₹{product.price.toFixed(2)}</p>
                            <p className={styles.productQuantity}>{product.quantity}</p>
                        </div>
                        <button className={styles.addToCart}>Add to Cart</button>
                    </div>
                ))
            )}
        </div>
    );
}
