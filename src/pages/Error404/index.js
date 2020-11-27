import React from 'react';
import { Link } from 'react-router-dom';
import './Error404.css';

/**
 * The 404 Page
 */
const Error404 = () => (
    <section className="error">
        <h2>Oops!</h2>
        <p>Looks like your connection is down or you stumbled on a broken link, or maybe the resource you are looking for does not exist. Either way, you can enter a location in the search form above or go back to the Landing Page.</p>
        <Link to="/">Back To Landing Page</Link>
    </section>
);

export default Error404;