import React from 'react';
import './Loading.css'; // Stil dosyasını import ediyoruz

const Loading = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
        </div>
    );
};

export default Loading;
