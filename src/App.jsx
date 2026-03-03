import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

// Auth & Admin
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';

// Custom Animated Routes wrapper for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard handles its own layout, so we might want to skip main Navbar/Footer there, but for simplicity we wrap App.jsx elements conditionally below */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  // Simple check to hide public Navbar/Footer on Admin pages
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <Router>
      <div className="app-container">
        {!isAdminRoute && <Navbar />}
        <main className={!isAdminRoute ? 'main-content' : ''} style={!isAdminRoute ? { paddingTop: '80px', minHeight: '100vh' } : {}}>
          <AnimatedRoutes />
        </main>
        {!isAdminRoute && <Footer />}

        {/* Background Decorative Blobs */}
        {!isAdminRoute && (
          <>
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
