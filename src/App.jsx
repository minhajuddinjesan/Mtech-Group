import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Testimonials from './components/Testimonials.jsx';
import Process from './components/Process.jsx';
import Faq from './components/Faq.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';
import StatusBanner from './components/StatusBanner.jsx';
import FloatingActions from './components/FloatingActions.jsx';

export default function App() {
  return (
    // reducedMotion="user" calms all animations for visitors who ask their device for less motion
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="bg-grid" aria-hidden="true" />
      <Cursor />
      <StatusBanner />
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <Services />
        <About />
        <Testimonials />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </MotionConfig>
  );
}
