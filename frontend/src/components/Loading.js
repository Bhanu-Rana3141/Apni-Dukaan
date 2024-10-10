import React from 'react';
import './Loading.css'; // Make sure this file is imported

export default function Loading() {
    return (
        <div className="loading-card">
            <div className="loading-spinner"></div>
            <p>This may take few seconds.</p>
        </div>
    );
};