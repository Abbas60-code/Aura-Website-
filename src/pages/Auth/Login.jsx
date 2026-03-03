import { useState } from 'react';
import AnimatedPage from '../../components/AnimatedPage';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import './Auth.css';

const API_BASE = 'http://127.0.0.1:8000/api';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
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
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Invalid email or password');
            }

            localStorage.setItem('user', JSON.stringify(data.user));
            window.dispatchEvent(new Event('userLoggedIn'));
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedPage className="auth-page flex-center">
            <div className="blob blob-1"></div>
            <div className="blob blob-2" style={{ background: 'var(--accent-secondary)' }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-panel auth-card"
            >
                <div className="text-center mb-6">
                    <Link to="/" className="text-gradient heading-md mb-2 block">Aura.</Link>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Welcome Back</h2>
                    <p className="text-secondary">Enter your credentials to access your account.</p>
                </div>

                {error && (
                    <div className="mb-4 text-center text-sm" style={{ color: 'var(--accent-tertiary)', background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
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
                        <div className="flex-between">
                            <label className="input-label">Password</label>
                            <a href="#" className="text-xs text-gradient">Forgot password?</a>
                        </div>
                        <div className="input-with-icon">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                name="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
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
                        {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
                    </button>
                </form>

                <p className="text-center text-secondary mt-6 text-sm">
                    Don't have an account? <Link to="/register" className="text-primary" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Create one</Link>
                </p>
            </motion.div>
        </AnimatedPage>
    );
};

export default Login;
