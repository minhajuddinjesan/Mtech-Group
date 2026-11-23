import { Component, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Scene3D = lazy(() => import('./Scene3D.jsx'));

// If WebGL or the 3D scene fails, hide it instead of blanking the whole page
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

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
  // As the hero scrolls away, the text sinks back into the scene
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 800], [0, 160]);
  const textScale = useTransform(scrollY, [0, 800], [1, 0.88]);
  const textOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section id="top" className="hero">
      <div className="hero-canvas">
        <SceneBoundary><Suspense fallback={null}><Scene3D /></Suspense></SceneBoundary>
      </div>
      <motion.div className="hero-text" style={{ y: textY, scale: textScale, opacity: textOpacity }}>
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
      </motion.div>
      <div className="hero-floor" aria-hidden="true" />
    </section>
  );
}
