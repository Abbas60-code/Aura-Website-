import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { motion as Motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        try {
            // Yahan apna Laravel backend URL daalo
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Something went wrong');
            }

            setSuccess('Your message has been sent!');
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                subject: '',
                message: '',
            });
        } catch (err) {
            setError(err.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedPage>
            <section className="section">
                <div className="container">
                    <div className="text-center mb-6">
                        <Motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="heading-lg mb-4"
                        >
                            Get In <span className="text-gradient">Touch</span>
                        </Motion.h1>
                        <Motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="text-lead mx-auto"
                            style={{ marginInline: 'auto' }}
                        >
                            Have a project in mind? We'd love to hear from you.
                        </Motion.p>
                    </div>

                    <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '3rem' }}>
                        {/* Contact Info */}
                        <Motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            <h2 className="heading-md mb-6">Contact Information</h2>
                            <p className="text-secondary mb-6">
                                Fill out the form and our team will get back to you within 24 hours.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div className="flex-center" style={{ width: 50, height: 50, borderRadius: '12px', background: 'var(--glass-bg)', color: 'var(--accent-primary)', border: '1px solid var(--border-light)' }}>
                                        <MapPin />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 600 }}>Our Location</h4>
                                        <p className="text-secondary">789 Innovation Drive, Tech City</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div className="flex-center" style={{ width: 50, height: 50, borderRadius: '12px', background: 'var(--glass-bg)', color: 'var(--accent-secondary)', border: '1px solid var(--border-light)' }}>
                                        <Phone />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 600 }}>Phone Number</h4>
                                        <p className="text-secondary">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div className="flex-center" style={{ width: 50, height: 50, borderRadius: '12px', background: 'var(--glass-bg)', color: 'var(--accent-tertiary)', border: '1px solid var(--border-light)' }}>
                                        <Mail />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 600 }}>Email Address</h4>
                                        <p className="text-secondary">hello@aurainc.com</p>
                                    </div>
                                </div>
                            </div>
                        </Motion.div>

                        {/* Contact Form */}
                        <Motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="glass-panel contact-form-card"
                            style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}
                        >
                            {success && (
                                <div className="alert alert-success" style={{ marginBottom: '1rem' }}>
                                    {success}
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="input-group">
                                        <label className="input-label">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            className="input-field"
                                            placeholder="John"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            className="input-field"
                                            placeholder="Doe"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input-field"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        className="input-field"
                                        placeholder="Project Inquiry..."
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Message</label>
                                    <textarea
                                        name="message"
                                        className="input-field"
                                        rows="5"
                                        placeholder="Tell us about your project..."
                                        style={{ resize: 'none' }}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary w-100"
                                    style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Message'} <Send size={18} />
                                </button>
                            </form>
                        </Motion.div>
                    </div>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Contact;
