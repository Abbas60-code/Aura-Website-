import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer section">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="text-gradient heading-md">Aura.</Link>
                        <p className="text-secondary mt-4">
                            Building the future of modern web experiences with cutting-edge design and seamless animations.
                        </p>
                        <div className="social-links mt-6">
                            <a href="#" className="social-icon"><Twitter size={20} /></a>
                            <a href="#" className="social-icon"><Github size={20} /></a>
                            <a href="#" className="social-icon"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4 className="text-primary mb-4">Quick Links</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/portfolio">Portfolio</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4 className="text-primary mb-4">Legal</h4>
                        <ul>
                            <li><Link to="#">Privacy Policy</Link></li>
                            <li><Link to="#">Terms of Service</Link></li>
                            <li><Link to="#">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h4 className="text-primary mb-4">Stay Updated</h4>
                        <p className="text-secondary mb-4">Subscribe to our newsletter for the latest updates.</p>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Enter your email" className="input-field" />
                            <button className="btn-primary" style={{ padding: '0.875rem' }}>
                                <Mail size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="text-muted">© {new Date().getFullYear()} Aura Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
