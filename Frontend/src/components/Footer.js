import React from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import FooterLogo from './FooterLogo';
import FooterLinks from './FooterLinks';
import FooterContactInfo from './FooterContactInfo';


export default function Footer() {

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Categories', path: '/categories' },
        { name: 'Contact', path: '/contact' },
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
      ];

      const categories = [
        { name: 'Beverages', path: '/beverages' },
        { name: 'Bakery', path: '/bakery' },
        { name: 'Branded foods & snacks', path: '/branded-foods-snacks' },
        { name: 'Stationary', path: '/stationary' },
        { name: 'Dairy Products', path: '/dairy-products' },
        { name: 'Food Grains', path: '/food-grains' },
        { name: 'Dry Fruits', path: '/dry-fruits' },
        { name: 'Chocolates & toffees', path: '/chocolates-toffees' },
        { name: 'Pooja items', path: '/pooja-items' },
        { name: 'Slippers', path: '/slippers' }
      ];      
    
      const moreOptions = [
        { name: 'Mosquitos Repellents', path: '/mosquitos-repellents' },
        { name: 'Cleaning & Households', path: '/cleaning-households' },
        { name: 'Eggs', path: '/eggs' },
        { name: 'Skin Care', path: '/skin-care' },
        { name: 'Hair Care', path: '/hair-care' },
        { name: 'Baby Care', path: '/baby-care' },
        { name: 'Perfumes', path: '/perfumes' },
        { name: 'LED Bulbs', path: '/led-bulbs' },
        { name: 'Vegetables', path: '/vegetables' },
        { name: 'Tooth Pastes & Brushes', path: '/tooth-pastes-brushes' },
      ];

    return (
        <>
            <div className={styles.footer}>
                <FooterLogo />
                <FooterLinks title="Quick Links" links={quickLinks} />
                <FooterLinks title="Categories" links={categories}/>
                <FooterLinks title="More Options" links={moreOptions} />
                <FooterContactInfo />
            </div>
        </>
    )
}
