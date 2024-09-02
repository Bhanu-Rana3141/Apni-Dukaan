import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CategoryItem.module.css'

export default function CategoryItem({category}) {

  const imageUrl = `http://localhost:5000/images/${category.image}`;

  return (
    <>
        <div className={styles.categoryItem}>
            <Link to={category.path}>
                <img src={imageUrl} alt={category.name} className={styles.categoryImage} />
                <p className={styles.categoryName}>{category.name}</p>
            </Link>
        </div>
    </>
  )
}
