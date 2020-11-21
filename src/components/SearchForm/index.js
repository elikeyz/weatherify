import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SearchForm.css';

/**
 * The search form component
 */
const SearchForm = () => {

    // Declare the location field input value state.
    const [location, setLocation] = useState('');

    const history = useHistory();

    const handleSearch = async (event) => {
        event.preventDefault();

        const searchTerm = location.split(',').map(term => term.trim()).join(',');

        history.push(`/weather?search=${encodeURIComponent(searchTerm)}`);
        window.location.reload();
    };

    return (
        <form onSubmit={(e) => handleSearch(e)} className="search-form">
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