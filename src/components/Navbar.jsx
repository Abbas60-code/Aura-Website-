import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(() => {
        try {
            const u = localStorage.getItem('user');
            return u ? JSON.parse(u) : null;
        } catch {
            return null;
        }
    });
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const syncUser = () => {
            try {
                const u = localStorage.getItem('user');
                setUser(u ? JSON.parse(u) : null);
            } catch {
                setUser(null);
            }
        };
        window.addEventListener('userLoggedIn', syncUser);
        window.addEventListener('userLoggedOut', syncUser);
        return () => {
            window.removeEventListener('userLoggedIn', syncUser);
            window.removeEventListener('userLoggedOut', syncUser);
        };
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}
        >
            <div className="container nav-container flex-between">
                <Link to="/" className="logo text-gradient heading-md">
                    Aura.
                </Link>

                {/* Desktop Nav */}
                <div className="nav-links hidden-mobile">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div layoutId="underline" className="nav-underline" />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="nav-actions hidden-mobile flex-center gap-3">
                    {user ? (
                        <>
                            <span className="text-secondary" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                                Hi, {user.name}
                            </span>
                            <button
                                className="btn-secondary"
                                onClick={() => {
                                    localStorage.removeItem('user');
                                    window.dispatchEvent(new Event('userLoggedOut'));
                                }}
                            >
                                <LogOut size={18} /> Logout
                            </button>
                            <Link to="/admin" className="nav-icon-link" title="Admin Panel">
                                <User size={20} />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-secondary">
                                <LogIn size={18} /> Login
                            </Link>
                            <Link to="/register" className="btn-primary">
                                Get Started
                            </Link>
                            <Link to="/admin" className="nav-icon-link" title="Admin Panel">
                                <User size={20} />
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="mobile-toggle hidden-desktop" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu (AnimatePresence normally wrapper, simplified here) */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mobile-menu glass-panel"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="mobile-nav-item"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="mobile-actions">
                        {user ? (
                            <>
                                <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Hi, {user.name}</span>
                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        localStorage.removeItem('user');
                                        window.dispatchEvent(new Event('userLoggedOut'));
                                        setIsOpen(false);
                                    }}
                                >
                                    Logout
                                </button>
                                <Link to="/admin" className="btn-secondary" onClick={() => setIsOpen(false)}>Admin</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-secondary" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link to="/register" className="btn-primary" onClick={() => setIsOpen(false)}>Register</Link>
                                <Link to="/admin" className="btn-secondary" onClick={() => setIsOpen(false)}>Admin</Link>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
