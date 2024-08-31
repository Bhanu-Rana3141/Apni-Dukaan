import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryItem from './CategoryItem';
import styles from './Categories.module.css';

export default function Categories() {
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <h2 className={styles.title}>Shop by category</h2>

            <div className={styles.categories}>
                {categories.map(category => (
                    <CategoryItem key={category.id} category={category} />
                ))}
            </div>
        </>
    );
}
