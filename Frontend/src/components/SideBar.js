import React from "react";
import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";

export default function SideBar({ subcategories, onSubcategoryClick, selectedSubcategory}) {
  return (
    <div className={styles.sidebarContainer}>
      <ul className={styles.sidebarList}>
        {subcategories.map((subcategory) => (
          <li
            key={subcategory}
            className={`${styles.sidebarItem} ${
              selectedSubcategory === subcategory ? styles.active : ""
            }`}
            onClick={() => onSubcategoryClick(subcategory)}
          >
            {subcategory}
          </li>
        ))}
      </ul>
    </div>
  );
}
