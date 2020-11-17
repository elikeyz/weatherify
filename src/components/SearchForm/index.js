import { useState } from 'react';
import './SearchForm.css';

const SearchForm = () => {

    const [location, setLocation] = useState('');

    return (
        <form className="search-form">
            <label htmlFor="location">Search Locations</label>
            <input id="location" type="search" placeholder="New York, USA" onChange={(e) => setLocation(e.target.value)} value={location} />
        </form>
    );
};

export default SearchForm;