import AnimatedPage from '../../components/AnimatedPage';
import { motion } from 'framer-motion';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';
import '../Auth/Auth.css';
import { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Sirf ye credentials se admin panel khulega
        if (email === 'muhammadabbas09dec@gmail.com' && password === 'abbasamir112233') {
            localStorage.setItem('adminAuth', 'true');
            onLogin();
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <AnimatedPage className="auth-page flex-center" style={{ minHeight: '100vh', padding: 0 }}>
            {/* Darker/Admin themed blobs */}
            <div className="blob blob-1" style={{ background: 'var(--text-secondary)' }}></div>
            <div className="blob blob-2" style={{ background: 'var(--text-primary)' }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-panel auth-card"
                style={{ borderTop: '4px solid var(--text-primary)' }}
            >
                <div className="text-center mb-6">
                    <div className="feature-icon mb-4" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}>
                        <Shield size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Admin Portal</h2>
                    <p className="text-secondary">Restricted access. Authorized personnel only.</p>
                </div>

                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-center text-sm" style={{ color: 'var(--accent-tertiary)', background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}>
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="input-group relative mb-4">
                        <label className="input-label">Email</label>
                        <div className="input-with-icon">
                            <User className="input-icon" size={20} />
                            <input
                                type="email"
                                className="input-field"
                                placeholder="Admin Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group relative mb-6">
                        <label className="input-label">Master Password</label>
                        <div className="input-with-icon">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button className="btn-primary w-100" style={{ width: '100%', justifyContent: 'center', background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
                        Authenticate <ArrowRight size={18} />
                    </button>

                    <div className="text-center mt-4">
                        <span className="text-xs text-muted">Authorized access only</span>
                    </div>
                </form>
            </motion.div>
        </AnimatedPage>
    );
};

export default AdminLogin;
