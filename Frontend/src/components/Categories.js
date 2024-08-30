import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Categories.module.css'
import CategoryItem from './CategoryItem';

export default function Categories() {

    const categories = [
        { id: '1', name: 'Beverages', image: 'Images/Beverages.png', path: '/beverages' },
        { id: '2', name: 'Bakery', image: 'Images/Bakery.jpeg', path: '/bakery' },
        { id: '3', name: 'Branded food & snacks', image: 'Images/Branded food & snacks.png', path: '/branded-food-snacks' },
        { id: '4', name: 'Stationary', image: 'Images/stationary.jfif', path: '/stationary' },
        { id: '5', name: 'Dairy Products', image: 'Images/Dairy.jpeg', path: '/dairy' },
        { id: '6', name: 'FoodGrains', image: 'Images/FoodGrains & masalas.png', path: '/foodgrains' },
        { id: '7', name: 'Dry Fruits', image: 'Images/dry fruits.jfif', path: '/dry-fruits' },
        { id: '8', name: 'Chocolates & toffees', image: 'Images/Chocolates.jpg', path: '/chocolates' },
        { id: '9', name: 'Vegetables', image: 'Images/vegetables.jpg', path: '/vegetables' },
        { id: '10', name: 'Tooth Pastes & brushes', image: 'Images/toothBrushes.avif', path: '/tooth-brushes' },
        { id: '11', name: 'Pooja items', image: 'Images/Pooja items.webp', path: '/pooja-items' },
        { id: '12', name: 'Slippers', image: 'Images/slippers.jfif', path: '/slippers' },
        { id: '13', name: 'Mosquitos Repellents', image: 'Images/mosquitos oils and coils.jfif', path: '/mosquitos-repellents' },
        { id: '14', name: 'Cleaning & households', image: 'Images/cleaning & households.png', path: '/cleaning-households' },
        { id: '15', name: 'Eggs', image: 'Images/eggs.avif', path: '/eggs' },
        { id: '16', name: 'Skin care', image: 'Images/skin care.jfif', path: '/skin-care' },
        { id: '17', name: 'Hair Care', image: 'Images/hair care.webp', path: '/hair-care' },
        { id: '18', name: 'Baby Care', image: 'Images/Baby Care.webp', path: '/baby-care' },
        { id: '19', name: 'Perfumes', image: 'Images/perfumes.jpeg', path: '/perfumes' },
        { id: '20', name: 'LED Bulbs', image: 'Images/led bulbs.webp', path: '/led-bulbs' },
      ];

  return (
    <>
        <h2 className={styles.title}>Shop by category</h2>

        <div className={styles.categories}>
            {categories.map(category => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>

    </>
  )
}
