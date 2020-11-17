import './Header.css';
import { Link } from 'react-router-dom';

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