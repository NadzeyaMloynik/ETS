import React from 'react';
import '../styles/WaitingComponent.css';

const WaitingComponent = () => {
    return (
        <div className="waiting-container">
            <div className="spinner"></div>
            <p>Loading ...</p>
        </div>
    );
};

export default WaitingComponent;
