import React, { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './ProductPage.module.css';

const ProductPage = () => {
    const navigate = useNavigate(); // for navigation
    const { id } = useParams(); // get productId from url 
    const [product, setProduct] = useState(null); 
    const [quantity, setQuantity] = useState(1);

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

    const addToCart = async (product) => {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error("Please log in to add items to the cart.");
            navigate('/login'); 
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/cart/add', {
                productId: product._id,
                name: product.name,
                description: product.description,
                image: product.image,
                price: product.price,
                quantity: quantity,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response.data.message || "Product added to cart successfully!");
        } catch (error) {
            toast.error("Failed to add product to cart.");
        }
    };

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
                        <select onChange={(e) => setQuantity(Number(e.target.value))}>    
                            <option selected>Quantity</option>
                            <option value="1">1</option>    
                            <option value="2">2</option>    
                            <option value="3">3</option>    
                            <option value="4">4</option>    
                            <option value="5">5</option>    
                            <option value="6">6</option>    
                            <option value="7">7</option>    
                            <option value="8">8</option>    
                            <option value="9">9</option>    
                            <option value="10">10</option>    
                        </select>    

                        <div className={styles.btn}>
                            <button className={styles.cartBtn} onClick={() => addToCart(product)}>Add to Cart</button>
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