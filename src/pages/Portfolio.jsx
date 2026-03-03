import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Portfolio = () => {
    const projects = [
        { title: "Neon E-Commerce", category: "Web App", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" },
        { title: "FinDash Pro", category: "Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
        { title: "Aura Social", category: "Mobile App", image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800" },
        { title: "Quantum AI Site", category: "Landing Page", image: "https://images.unsplash.com/photo-1620825937374-87fc1d6aafc1?auto=format&fit=crop&q=80&w=800" },
        { title: "Lumina Studio", category: "Corporate", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
        { title: "HealthSync", category: "Healthcare SaaS", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" }
    ];

    return (
        <AnimatedPage>
            <section className="section">
                <div className="container">
                    <div className="text-center mb-6">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="heading-lg mb-4"
                        >
                            Featured <span className="text-gradient">Work</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="text-lead mx-auto"
                            style={{ marginInline: 'auto' }}
                        >
                            A selection of our most recent and impactful projects.
                        </motion.p>
                    </div>

                    <div className="grid-2">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="portfolio-card glass-panel relative overflow-hidden group"
                                style={{ borderRadius: '24px', padding: 0 }}
                            >
                                <div style={{ height: '300px', overflow: 'hidden' }}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease'
                                        }}
                                        className="portfolio-image"
                                    />
                                </div>

                                {/* Hover overlay */}
                                <div
                                    className="portfolio-overlay absolute inset-0 flex flex-col justify-end p-6"
                                    style={{
                                        background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)',
                                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem',
                                        opacity: 0, transition: 'opacity 0.3s ease'
                                    }}
                                >
                                    <span className="text-gradient" style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{project.category}</span>
                                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>{project.title}</h3>
                                    <button className="btn-secondary" style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                                        View Project <ExternalLink size={16} style={{ marginLeft: '4px' }} />
                                    </button>
                                </div>

                                <style>{`
                  .portfolio-card:hover .portfolio-image { transform: scale(1.05); }
                  .portfolio-card:hover .portfolio-overlay { opacity: 1; }
                `}</style>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Portfolio;
