import { motion } from 'framer-motion';
import { ArrowRight, Zap, Code, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import './Home.css';

const Home = () => {
    const features = [
        { icon: <Zap size={32} />, title: "Lightning Fast", desc: "Optimized for speed and seamless interactions." },
        { icon: <Code size={32} />, title: "Modern Stack", desc: "Built with React, Framer Motion, and CSS variables." },
        { icon: <Layout size={32} />, title: "Premium Design", desc: "Glassmorphism, dark mode, and fluid aesthetics." },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <AnimatedPage>
            {/* Hero Section */}
            <section className="hero-section flex-center">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="hero-badge mb-6"
                    >
                        <span>✨ Introducing the next generation of web</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="heading-xl mb-6"
                    >
                        Crafting Digital <br />
                        <span className="text-gradient">Experiences</span> That Wow.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-lead mx-auto mb-6"
                        style={{ marginInline: 'auto' }}
                    >
                        Elevate your brand with a visually stunning, highly interactive, and responsive online presence built for the modern era.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="hero-actions flex-center gap-4"
                    >
                        <Link to="/portfolio" className="btn-primary">
                            View Our Work <ArrowRight size={20} />
                        </Link>
                        <Link to="/contact" className="btn-secondary">
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section features-section">
                <div className="container">
                    <div className="text-center mb-6">
                        <h2 className="heading-md mb-2">Why Choose Us</h2>
                        <p className="text-secondary">We deliver excellence across every metric.</p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid-3"
                    >
                        {features.map((feat, index) => (
                            <motion.div key={index} variants={itemVariants} className="card feature-card text-center">
                                <div className="feature-icon mb-4">
                                    {feat.icon}
                                </div>
                                <h3 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>{feat.title}</h3>
                                <p className="text-secondary">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <div className="glass-panel text-center cta-box">
                        <h2 className="heading-lg mb-4">Ready to start?</h2>
                        <p className="text-lead mx-auto mb-6" style={{ marginInline: 'auto', marginBottom: '2rem' }}>
                            Join thousands of forward-thinking companies building the future.
                        </p>
                        <Link to="/register" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
                            Create an Account Now
                        </Link>
                    </div>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Home;
