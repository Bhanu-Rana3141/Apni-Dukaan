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
                        <h2 className={styles.productName}>{product.name}</h2>
                        <p className={styles.productDescription}>{product.description}</p>
                        <p className={styles.productCapacity}>{product.quantity}</p>
                        <p className={styles.productPrice}>Price: ₹{product.price}</p>
                        <p className={styles.inclusiveLine}>(inclusive of all taxes)</p>
                        <button className={styles.cartBtn} onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                </>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductPage;