import { useState } from 'react';
import AnimatedPage from '../../components/AnimatedPage';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';
import './Auth.css';

const API_BASE = 'http://127.0.0.1:8000/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_BASE}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || data.errors ? Object.values(data.errors).flat().join(' ') : 'Registration failed');
            }

            // Auto login: store user and redirect to home
            localStorage.setItem('user', JSON.stringify(data.user));
            window.dispatchEvent(new Event('userLoggedIn'));
            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedPage className="auth-page flex-center">
            <div className="blob blob-1" style={{ background: 'var(--accent-tertiary)' }}></div>
            <div className="blob blob-2" style={{ background: 'var(--accent-primary)' }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-panel auth-card"
            >
                <div className="text-center mb-6">
                    <Link to="/" className="text-gradient heading-md mb-2 block">Aura.</Link>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Create an Account</h2>
                    <p className="text-secondary">Join us and start building the future.</p>
                </div>

                {error && (
                    <div className="mb-4 text-center text-sm" style={{ color: 'var(--accent-tertiary)', background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group relative">
                        <label className="input-label">Full Name</label>
                        <div className="input-with-icon">
                            <User className="input-icon" size={20} />
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group relative">
                        <label className="input-label">Email Address</label>
                        <div className="input-with-icon">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                name="email"
                                className="input-field"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group relative mb-2">
                        <label className="input-label">Password</label>
                        <div className="input-with-icon">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                name="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                minLength={6}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-100 mt-6"
                        style={{ width: '100%', justifyContent: 'center' }}
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Register Now'} <ArrowRight size={18} />
                    </button>
                </form>

                <p className="text-center text-secondary mt-6 text-sm">
                    Already have an account? <Link to="/login" className="text-primary" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Sign in</Link>
                </p>
            </motion.div>
        </AnimatedPage>
    );
};

export default Register;
