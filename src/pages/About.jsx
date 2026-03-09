import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';

const About = () => {
    const stats = [
        { number: '10+', label: 'Years Experience' },
        { number: '200+', label: 'Projects Completed' },
        { number: '50+', label: 'Team Members' },
        { number: '99%', label: 'Client Satisfaction' },
    ];

    return (
        <AnimatedPage>
            <section className="section">
                <div className="container">
                    <div className="text-center mb-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="heading-lg mb-4"
                        >
                            Our <span className="text-gradient">Story</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="text-lead mx-auto"
                            style={{ marginInline: 'auto' }}
                        >
                            We are a collective of designers, developers, and strategists passionate about building the web of tomorrow.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="glass-panel"
                        style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', marginBottom: '4rem' }}
                    >
                        <h2 className="heading-md mb-4 text-center">The Mission</h2>
                        <p className="text-secondary text-center" style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>
                            To democratize premium digital experiences by providing cutting-edge, accessible, and stunning web solutions to businesses of all sizes. We believe that a website should be more than just an informational portal; it should be an emotional journey that connects brands with their audience.
                        </p>
                    </motion.div>

                    <div className="grid-3 mt-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                className="card text-center"
                            >
                                <h3 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                                    {stat.number}
                                </h3>
                                <p className="text-secondary font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default About;
