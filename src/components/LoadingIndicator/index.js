import React from 'react';
import './LoadingIndicator.css';

/**
 * The Loading Indicator component
 */
const LoadingIndicator = () => {
    return (
        <div className="spin-container">
            <div className="spin" id="loader"></div>
            <div className="spin" id="loader2"></div>
            <div className="spin" id="loader3"></div>
            <div className="spin" id="loader4"></div>
            <span id="text">LOADING...</span>
        </div>
    )
};

export default LoadingIndicator;