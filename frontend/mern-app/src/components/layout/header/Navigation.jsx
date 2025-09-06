import  { useState, useEffect } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import CartDrawer from '../cartDrawer/CartDrawer';
import { 
  MdOutlineShoppingCart, 
  MdSearch,
  MdMenu,
  MdClose,
  MdDarkMode,
  MdLightMode
} from "react-icons/md";
import { useSelector } from 'react-redux';

const Navigation = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { cartItems } = useSelector(state => state.cart);

    // Calculate total items in cart
    const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Dark mode initialization
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedMode !== null) {
            setDarkMode(savedMode === 'true');
        } else {
            setDarkMode(prefersDark);
        }
    }, []);

    // Apply dark mode class to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        setSearchQuery('');
        setShowSearch(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        if (showSearch) setShowSearch(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* Logo */}
                    <Link to="/" className="logo-link">
                        <div className="logo">
                            <MdOutlineShoppingCart className="logo-icon" />
                            <h1 className="logo-text">E-Commerce</h1>
                        </div>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button 
                        className="mobile-menu-button"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <MdClose className="menu-icon" />
                        ) : (
                            <MdMenu className="menu-icon" />
                        )}
                    </button>

                    {/* Navigation Links */}
                    <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                        <Link 
                            to="/" 
                            className="nav-link"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/products" 
                            className="nav-link"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Products
                        </Link>

                        {/* Search */}
                        <div className="search-container">
                            {showSearch ? (
                                <form onSubmit={handleSearch} className="search-form">
                                    <input 
                                        type="text" 
                                        placeholder="Search for products..." 
                                        className="search-input"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                    />
                                    <button 
                                        type="submit" 
                                        className="search-button"
                                        aria-label="Search"
                                    >
                                        <MdSearch className="search-icon" />
                                    </button>
                                </form>
                            ) : (
                                <button 
                                    className="search-toggle"
                                    onClick={() => {
                                        setShowSearch(true);
                                        setMobileMenuOpen(false);
                                    }}
                                    aria-label="Open search"
                                >
                                    <MdSearch className="search-icon" />
                                </button>
                            )}
                        </div>

                        {/* Dark Mode Toggle */}
                        <button 
                            className="dark-mode-toggle"
                            onClick={toggleDarkMode}
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? (
                                <MdLightMode className="mode-icon" />
                            ) : (
                                <MdDarkMode className="mode-icon" />
                            )}
                            <span className="mode-text">
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </span>
                        </button>

                        {/* Cart Button */}
                        <button 
                            onClick={toggleCartDrawer} 
                            className="cart-button" 
                            aria-label="Open cart"
                        >
                            <MdOutlineShoppingCart className="cart-icon" />
                            {cartItemsCount > 0 && (
                                <span className="cart-count">{cartItemsCount}</span>
                            )}
                        </button>
                        
                        {/* Login */}
                        <Link 
                            to="/login" 
                            className="login-button"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </nav>
            
            {/* Cart Drawer */}
            <CartDrawer 
                drawerOpen={drawerOpen} 
                toggleCartDrawer={toggleCartDrawer} 
            />
        </>
    );
};

export default Navigation;