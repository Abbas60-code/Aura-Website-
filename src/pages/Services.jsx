import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { PenTool, Smartphone, Globe, Cloud, Shield, Database } from 'lucide-react';

const Services = () => {
    const services = [
        { icon: <Globe size={40} />, title: "Web Development", desc: "Custom, responsive websites built with modern frameworks and best practices." },
        { icon: <Smartphone size={40} />, title: "App Development", desc: "Cross-platform mobile applications that deliver native-like experiences." },
        { icon: <PenTool size={40} />, title: "UI/UX Design", desc: "User-centric design that blends aesthetics with intuitive functionality." },
        { icon: <Cloud size={40} />, title: "Cloud Solutions", desc: "Scalable cloud infrastructure and deployment architectures." },
        { icon: <Shield size={40} />, title: "Cybersecurity", desc: "Robust security audits and implementation to protect your data." },
        { icon: <Database size={40} />, title: "Data Analytics", desc: "Actionable insights derived from comprehensive data analysis." },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
    };

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
                            Our <span className="text-gradient">Services</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="text-lead mx-auto"
                            style={{ marginInline: 'auto' }}
                        >
                            Comprehensive digital solutions tailored to elevate your business in the modern landscape.
                        </motion.p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid-3"
                    >
                        {services.map((service, index) => (
                            <motion.div key={index} variants={itemVariants} className="card service-card relative overflow-hidden group">
                                {/* Hover Glow Effect via CSS */}
                                <div className="service-icon mb-4" style={{ color: 'var(--accent-secondary)' }}>
                                    {service.icon}
                                </div>
                                <h3 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>{service.title}</h3>
                                <p className="text-secondary">{service.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </AnimatedPage>
    );
};

export default Services;
