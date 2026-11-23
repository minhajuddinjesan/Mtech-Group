import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';
import StatusBanner from './components/StatusBanner.jsx';

export default function App() {
  return (
    // reducedMotion="user" calms all animations for visitors who ask their device for less motion
    <MotionConfig reducedMotion="user">
      <div className="bg-grid" aria-hidden="true" />
      <Cursor />
      <StatusBanner />
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Services />
        <Process />
      </main>
      <Footer />
    </MotionConfig>
  );
}
