const SearchForm = () => {
    return (
        <form className="search-form">
            <label htmlFor="location">Search Locations</label>
            <input id="location" type="search" placeholder="New York, USA" />
        </form>
    );
};

export default SearchForm;