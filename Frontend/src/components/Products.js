import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';
import axios from 'axios';
import SideBar from './SideBar';
import ProductList from './ProductList';
import { useParams } from 'react-router';

export default function Products() {

  const { categoryName } = useParams();

  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');

  // Fetching all subcategories related to category, on the left side bar
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/subcategories/category/${categoryName}`);
        setSubcategories(response.data); 
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [categoryName]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = selectedSubcategory === 'All'
          ? `http://localhost:5000/api/products/category/${categoryName}`
          : `http://localhost:5000/api/products/category/${categoryName}/subcategory/${selectedSubcategory}`;
        const response = await axios.get(endpoint);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryName, selectedSubcategory]);

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  return (
    <div className={styles.productsContainer}>
      <SideBar subcategories={subcategories} onSubcategoryClick={handleSubcategoryClick} selectedSubcategory={selectedSubcategory}/>
      <ProductList products={products} />
    </div>
  );
}
