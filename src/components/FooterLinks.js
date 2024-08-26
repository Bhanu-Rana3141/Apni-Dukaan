import React from 'react';
import styles from './FooterLinks.module.css'
import { Link } from 'react-router-dom';

export default function FooterLinks({ title, links }) {
    return (
        <div className={styles.links}>
            <h4>{title}</h4>
            {links.map(link => (
                <Link key={link.name} to={link.path}>
                    <p>{link.name}</p>
                </Link>
            ))}
        </div>
    );
}
