import React from 'react';
import styles from './SideBar.module.css';
import { Link } from 'react-router-dom';

export default function SideBar({ subcategories, onSubcategoryClick}) {
  return (
    <div className={styles.sidebarContainer}>
      <ul className={styles.sidebarList}>
        {subcategories.map(subcategory => (
              <Link to={`/subcategory/${subcategory}`}>
                  <li key={subcategory.id} className={styles.sidebarItem} onClick={() => onSubcategoryClick(subcategory.subcategory)}>
                      {subcategory}
                  </li>
              </Link>
        ))}
      </ul>
    </div>
  );
}
