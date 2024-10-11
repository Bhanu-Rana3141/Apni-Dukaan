import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Categories.module.css';

export default function Categories() {

  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    
      const fetchCategories = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/categories');
          setCategories(response.data);
        } 
        catch(error) {
          console.log(`Erorr in fetching categories : ${error.message}`);
        }
      }

      fetchCategories();
  }, []);

  return (
    <>
      <h2 className={styles.heading}>Shop by category</h2>

      {categories.length === 0 ? (
        <div><img className={styles.error} src="\images\Error404.jpg" alt="error404"/></div>
      ) : (
        <div className={styles.categoriesContainer}>
          {categories.map((category) => {
            const imageUrl = `http://localhost:5000/images/${category.image}`;
            const linkPath = `/${category.name}`;
            
            return (
              <div key={category._id} className={styles.categoriesItem}>
                <Link to={linkPath.toLowerCase()}>
                  <img src={imageUrl} alt={category.name} className={styles.categoryImage} />
                  <h4 className={styles.categoryName}>{category.name}</h4>
                </Link>
              </div>                
            );
          })}
        </div>
      )}
    </>
  )
}
