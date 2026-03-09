import AnimatedPage from '../../components/AnimatedPage';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, Activity, FileText, Bell, Search, LogOut } from 'lucide-react';
import './Admin.css';
import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';

const API_BASE = `${import.meta.env.VITE_API_URL}/api`;


const AdminDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('adminAuth') === 'true');
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchContacts = async () => {
            try {
                const res = await fetch(`${API_BASE}/contacts`);
                if (!res.ok) throw new Error('Failed to load contacts');
                const data = await res.json();
                setContacts(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || 'Could not load data');
                setContacts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
    }

    const sidebarLinks = [
        { icon: <LayoutDashboard size={20} />, label: "Overview", path: "/admin" },
        { icon: <Users size={20} />, label: "Users", path: "/admin/users" },
        { icon: <Activity size={20} />, label: "Analytics", path: "/admin/analytics" },
        { icon: <FileText size={20} />, label: "Content", path: "/admin/content" },
        { icon: <Settings size={20} />, label: "Settings", path: "/admin/settings" },
    ];

    // Real stats from contacts data
    const totalContacts = contacts.length;
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const contactsThisMonth = contacts.filter((c) => {
        const d = new Date(c.created_at);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    }).length;
    const recentCount = contacts.length > 0 ? Math.min(contacts.length, 5) : 0;

    const stats = [
        { label: "Total Contacts", value: totalContacts.toLocaleString(), sub: "Form submissions" },
        { label: "This Month", value: contactsThisMonth.toLocaleString(), sub: "New submissions" },
        { label: "Recent", value: recentCount.toString(), sub: "Latest entries" },
        { label: "Status", value: "Live", sub: "API connected" },
    ];

    return (
        <AnimatedPage className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar glass-panel">
                <div className="sidebar-header mb-6">
                    <Link to="/" className="text-gradient heading-md">Aura.</Link>
                    <span className="badge mt-2">Admin Pro</span>
                </div>

                <nav className="sidebar-nav">
                    {sidebarLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.path}
                            className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button
                        onClick={() => {
                            localStorage.removeItem('adminAuth');
                            setIsAuthenticated(false);
                            navigate('/');
                        }}
                        className="sidebar-link logout-link w-100 text-left"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {/* Top Header */}
                <header className="admin-topbar glass-panel flex-between mb-6">
                    <div className="search-bar">
                        <Search size={20} className="text-muted" />
                        <input type="text" placeholder="Search..." className="admin-input" />
                    </div>

                    <div className="topbar-actions flex-center gap-4">
                        <button className="icon-btn relative">
                            <Bell size={20} />
                            <span className="notification-dot"></span>
                        </button>
                        <div className="avatar">
                            <img src="https://i.pravatar.cc/150?img=33" alt="Admin" />
                        </div>
                    </div>
                </header>

                {/* Dashboard Content - changes by route */}
                <div className="dashboard-content">
                    {location.pathname === '/admin' && (
                        <>
                            <div className="mb-6">
                                <h1 className="heading-md">Welcome back, Admin 👋</h1>
                                <p className="text-secondary">Here's what's happening today.</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid-responsive mb-6">
                                {stats.map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                                        className="card admin-stat-card"
                                    >
                                        <p className="text-secondary mb-2">{stat.label}</p>
                                        <div className="flex-between align-end">
                                            <h3 className="heading-md" style={{ fontSize: '2rem' }}>{stat.value}</h3>
                                            {stat.sub && (
                                                <span className="text-xs text-muted">{stat.sub}</span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Recent Contacts - Real data from DB */}
                            <div className="grid-layout">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                    className="glass-panel"
                                    style={{ padding: '2rem' }}
                                >
                                    <h3 className="mb-4 font-semibold" style={{ fontSize: '1.25rem' }}>Contact Form Submissions</h3>
                                    {error && (
                                        <p className="text-secondary mb-4" style={{ color: 'var(--accent-tertiary)' }}>{error}</p>
                                    )}
                                    {loading ? (
                                        <p className="text-secondary">Loading...</p>
                                    ) : (
                                        <div className="table-wrapper">
                                            <table className="admin-table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Subject</th>
                                                        <th>Message</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {contacts.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="5" className="text-secondary text-center" style={{ padding: '2rem' }}>
                                                                No contact submissions yet.
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        [...contacts]
                                                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                                            .map((c) => (
                                                                <tr key={c.id}>
                                                                    <td>
                                                                        <div className="flex-center gap-2" style={{ justifyContent: 'flex-start' }}>
                                                                            <span>{[c.FirstName, c.LastName].filter(Boolean).join(' ') || '—'}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-secondary">{c.Email}</td>
                                                                    <td>{c.Subject || '—'}</td>
                                                                    <td className="text-secondary" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.Message}>
                                                                        {c.Message || '—'}
                                                                    </td>
                                                                    <td className="text-secondary">
                                                                        {new Date(c.created_at).toLocaleDateString()}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </>
                    )}

                    {location.pathname === '/admin/users' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <div className="mb-6">
                                <h1 className="heading-md">Users</h1>
                                <p className="text-secondary">Manage registered users and contact leads.</p>
                            </div>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 className="mb-4 font-semibold" style={{ fontSize: '1.25rem' }}>Contact leads (from form)</h3>
                                {loading ? (
                                    <p className="text-secondary">Loading...</p>
                                ) : contacts.length === 0 ? (
                                    <p className="text-secondary">No leads yet.</p>
                                ) : (
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {contacts.map((c) => (
                                            <li key={c.id} className="flex-between" style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
                                                <div>
                                                    <strong>{[c.FirstName, c.LastName].filter(Boolean).join(' ') || '—'}</strong>
                                                    <span className="text-secondary" style={{ marginLeft: 8 }}>{c.Email}</span>
                                                </div>
                                                <span className="text-muted text-xs">{new Date(c.created_at).toLocaleDateString()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {location.pathname === '/admin/analytics' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <div className="mb-6">
                                <h1 className="heading-md">Analytics</h1>
                                <p className="text-secondary">Summary of contact form activity.</p>
                            </div>
                            <div className="grid-responsive mb-6">
                                <div className="card admin-stat-card">
                                    <p className="text-secondary mb-2">Total submissions</p>
                                    <h3 className="heading-md" style={{ fontSize: '2rem' }}>{contacts.length}</h3>
                                </div>
                                <div className="card admin-stat-card">
                                    <p className="text-secondary mb-2">This month</p>
                                    <h3 className="heading-md" style={{ fontSize: '2rem' }}>{contactsThisMonth}</h3>
                                </div>
                                <div className="card admin-stat-card">
                                    <p className="text-secondary mb-2">This week</p>
                                    <h3 className="heading-md" style={{ fontSize: '2rem' }}>
                                        {contacts.filter((c) => {
                                            const d = new Date(c.created_at);
                                            const now = new Date();
                                            const weekAgo = new Date(now);
                                            weekAgo.setDate(weekAgo.getDate() - 7);
                                            return d >= weekAgo;
                                        }).length}
                                    </h3>
                                </div>
                            </div>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 className="mb-4 font-semibold" style={{ fontSize: '1.25rem' }}>Submissions by month</h3>
                                {(() => {
                                    const byMonth = {};
                                    contacts.forEach((c) => {
                                        const d = new Date(c.created_at);
                                        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                                        byMonth[key] = (byMonth[key] || 0) + 1;
                                    });
                                    const entries = Object.entries(byMonth).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 6);
                                    return entries.length === 0 ? (
                                        <p className="text-secondary">No data yet.</p>
                                    ) : (
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {entries.map(([month, count]) => (
                                                <li key={month} className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)' }}>
                                                    <span>{month}</span>
                                                    <strong>{count}</strong>
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                })()}
                            </div>
                        </motion.div>
                    )}

                    {location.pathname === '/admin/content' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <div className="mb-6">
                                <h1 className="heading-md">Content</h1>
                                <p className="text-secondary">Manage site pages and content.</p>
                            </div>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <p className="text-secondary mb-4">Content management can be added here (e.g. edit homepage text, services, etc.).</p>
                                <div className="flex-center gap-4" style={{ flexWrap: 'wrap' }}>
                                    <div className="card" style={{ padding: '1.5rem', minWidth: 160 }}>Home</div>
                                    <div className="card" style={{ padding: '1.5rem', minWidth: 160 }}>About</div>
                                    <div className="card" style={{ padding: '1.5rem', minWidth: 160 }}>Services</div>
                                    <div className="card" style={{ padding: '1.5rem', minWidth: 160 }}>Contact</div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {location.pathname === '/admin/settings' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <div className="mb-6">
                                <h1 className="heading-md">Settings</h1>
                                <p className="text-secondary">Admin and site settings.</p>
                            </div>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 className="mb-4 font-semibold" style={{ fontSize: '1.25rem' }}>General</h3>
                                <div className="input-group mb-4">
                                    <label className="input-label">Site name</label>
                                    <input type="text" className="input-field" defaultValue="Aura" placeholder="Site name" />
                                </div>
                                <div className="input-group mb-4">
                                    <label className="input-label">Contact email</label>
                                    <input type="email" className="input-field" defaultValue="hello@aurainc.com" placeholder="Contact email" />
                                </div>
                                <h3 className="mb-4 mt-6 font-semibold" style={{ fontSize: '1.25rem' }}>Security</h3>
                                <p className="text-secondary">Admin login is restricted to configured email/password. Change credentials in code (AdminLogin.jsx) for production.</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Fallback when path doesn't match (e.g. /admin/something-else) */}
                    {!['/admin', '/admin/users', '/admin/analytics', '/admin/content', '/admin/settings'].includes(location.pathname) && (
                        <div className="mb-6">
                            <h1 className="heading-md">Overview</h1>
                            <p className="text-secondary">Select a section from the sidebar.</p>
                        </div>
                    )}
                </div>
            </main>
        </AnimatedPage>
    );
};

export default AdminDashboard;
