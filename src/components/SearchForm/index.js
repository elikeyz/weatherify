import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SearchForm.css';

/**
 * The search form component
 */
const SearchForm = () => {

    // Declare the location field input value state.
    const [location, setLocation] = useState('');

    // Declare History object using useHistory hook
    const history = useHistory();

    // Sanitize the search term and send it to the weather details page
    const handleSearch = async (event) => {
        // Prevent the page from reloading before function runs completely.
        event.preventDefault();

        // Remove unnecessary spaces from search term
        const searchTerm = location.split(',').map(term => term.trim()).join(',');

        // Pass the search term as a URL query and reload the page to load the new content
        history.push(`/weather?search=${encodeURIComponent(searchTerm)}`);
        window.location.reload();
    };

    // Render the search form
    return (
        <form data-testid="search-form" onSubmit={(e) => handleSearch(e)} className="search-form">
            <label htmlFor="location">Search Locations</label>
            <input 
                id="location" 
                type="search" 
                placeholder="New York, USA" 
                onChange={(e) => setLocation(e.target.value)} 
                value={location} 
                />
        </form>
    );
};

export default SearchForm;