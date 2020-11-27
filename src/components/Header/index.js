import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

/**
 * The Header Component
 */
const Header = () => (
    <header>
        <Link to="/">
            <h1>Weatherify</h1>
        </Link>
    </header>
);

export default Header;