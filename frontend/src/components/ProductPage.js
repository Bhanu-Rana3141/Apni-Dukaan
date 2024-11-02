import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductPage.module.css';

const ProductPage = () => {
    const { id } = useParams(); // get productId from url 
    const [product, setProduct] = useState(null); 


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`); 
                setProduct(response.data);
            } catch (error) {
                console.log('Failed to fetch product:', error);
            }            
        };

        fetchProduct();
    }, [id]);

    return (
        <div className={styles.productPage}>
            {product ? (
                <>
                    <div className={styles.productImage}>
                        <img src={`http://localhost:5000/images/${product.image}`} alt={product.name} />
                    </div>

                    <div className={styles.productDetails}>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <p>₹{product.price.toFixed(2)}</p>
                        <p className={styles.quantity}>{product.quantity}</p>
                        <select>
                            <option selected>Select Quantity</option>    
                            <option >1</option>    
                            <option >2</option>    
                            <option >3</option>    
                            <option >4</option>    
                            <option >5</option>    
                            <option >6</option>    
                            <option >7</option>    
                            <option >8</option>    
                            <option >9</option>    
                            <option >10</option>    
                            <option >11</option>    
                            <option >12</option>    
                            <option >13</option>    
                            <option >14</option>    
                            <option >15</option>    
                            <option >16</option>    
                            <option >17</option>    
                            <option >18</option>    
                            <option >19</option>    
                            <option >20</option>    
                        </select>    

                        <div className={styles.btn}>
                            <button className={styles.cartBtn}>Add to Cart</button>
                            <button className={styles.buyBtn}>Buy Now</button>
                        </div>

                    </div>
                </>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductPage;
