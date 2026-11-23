import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

const Scene3D = lazy(() => import('./Scene3D.jsx'));

// Letter-by-letter reveal
function Split({ text, delay = 0 }) {
  return (
    <span aria-label={text}>
      {[...text].map((c, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ y: 80, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ delay: delay + i * 0.035, type: 'spring', damping: 14 }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-canvas">
        <Suspense fallback={null}><Scene3D /></Suspense>
      </div>
      <div className="hero-text">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Digital studio · Belgium
        </motion.p>
        <h1>
          <Split text="We build the" /><br />
          <span className="grad"><Split text="digital future" delay={0.5} /></span>
        </h1>
        <motion.p className="sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
          Websites, apps, video editing and IT security — crafted by M Tech Group for ambitious businesses.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
          <a href="#services" className="btn">Explore services</a>
          <a href="#contact" className="btn ghost">Talk to us</a>
        </motion.div>
      </div>
    </section>
  );
}
