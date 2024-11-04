import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Products.module.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
    const { categoryName, subcategoryName } = useParams();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const navigate = useNavigate();

    // Fetch all categories and subcategories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories'); 
            setCategories(response.data);
            
            const category = response.data.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());

            // Set subcategories for the selected category
            if (category) {
                setSubcategories(category.subcategories); 
            } else {
                console.error('Category not found:', categoryName);
                setSubcategories([]); // Clear subcategories if category not found
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch products based on category or subcategory
    const fetchProducts = async () => {
        try {
            let response;
            if (subcategoryName) {
                response = await axios.get(`http://localhost:5000/api/products/category/${categoryName}/subcategory/${subcategoryName}`);
            } else {
                response = await axios.get(`http://localhost:5000/api/products/category/${categoryName}`);
            }
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    // Fetch categories to extract subcategories when categoryName changes
    useEffect(() => {
        fetchCategories();
    }, [categoryName]);

    // Fetch products when categoryName or subcategoryName changes
    useEffect(() => {
        fetchProducts(); 
    }, [categoryName, subcategoryName]);

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
                quantity: 1,
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
        <div className={styles.productsContainer}>
            <div className={styles.leftSidebar}>
                <ul className={styles.subcategoriesList}>
                    {subcategories.length > 0 ? (
                        subcategories.map((sub) => (
                            <li 
                                key={sub} 
                                onClick={() => navigate(`/categories/${categoryName}/products/${sub}`)}
                                className={styles.subcategories} 
                            >
                                {sub}
                            </li>
                        ))
                    ) : (
                        <p>No subcategories available.</p>
                    )}
                </ul>
            </div>
            

            <div className={styles.products}> 
                {products.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className={styles.productItem}>
                            <Link to={`/product/${product._id}`}>
                                <img className={styles.productImage} src={`http://localhost:5000/images/${product.image}`} alt={product.name} />
                                <h3 className={styles.productName}>{product.name}</h3>
                                <div className={styles.itemFooter}>
                                    <p className={styles.productPrice}>₹{product.price.toFixed(2)}</p>
                                    <p className={styles.productQuantity}>{product.quantity}</p>
                                </div>
                            </Link>
                            <button className={styles.addToCart} onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Products;
