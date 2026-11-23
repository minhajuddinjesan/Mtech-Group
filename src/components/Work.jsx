import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal.jsx';

export default function Work() {
  const card = useRef();
  // The card starts tipped back like a screen lying on a desk and stands up as it scrolls into view
  const { scrollYProgress } = useScroll({ target: card, offset: ['start end', 'center center'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const tilt = useTransform(progress, [0, 1], [28, 0]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  const lift = useTransform(progress, [0, 1], [80, 0]);

  // Layers inside the preview drift by different amounts to fake depth
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 20 });
  const sy = useSpring(py, { stiffness: 150, damping: 20 });
  const layer = (depth) => ({
    x: useTransform(sx, (v) => v * depth),
    y: useTransform(sy, (v) => v * depth),
  });
  const bar = layer(6);
  const content = layer(14);
  const orb = layer(-22);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <section id="work" className="section work-section">
      <p className="eyebrow">A recent project</p>
      <Reveal>Work we're <span className="grad">proud of</span></Reveal>
      <div className="work-stage">
        <motion.article
          ref={card}
          className="work-card"
          style={{ rotateX: tilt, scale, y: lift, transformPerspective: 1200, transformOrigin: '50% 100%' }}
        >
          <div className="work-preview" aria-label="Preview of the NextStep Immigration website" onMouseMove={onMove} onMouseLeave={onLeave}>
            <motion.div className="preview-browser" style={bar}>
              <div className="preview-dots" aria-hidden="true"><i /><i /><i /></div>
              <span>nextstep-immigration.com</span>
            </motion.div>
            <motion.div className="preview-content" style={content}>
              <span className="preview-brand">next<span>step</span></span>
              <span className="preview-kicker">STUDY · WORK · RESIDENCY VISAS</span>
              <h3>Your next step starts with the right paperwork, done right.</h3>
              <p>Clear guidance for your journey abroad.</p>
              <span className="preview-link">Explore your options&nbsp; ↗</span>
            </motion.div>
            <motion.div className="preview-orb" aria-hidden="true" style={orb} />
          </div>
          <div className="work-details">
            <div className="work-heading">
              <div>
                <p className="work-label">LIVE WEBSITE</p>
                <h3>NextStep Immigration</h3>
              </div>
              <span className="work-arrow" aria-hidden="true">↗</span>
            </div>
            <p className="work-description">
              A welcoming online home for immigration guidance, helping students,
              professionals, and families understand their next steps.
            </p>
            <ul className="work-tags" aria-label="Project highlights">
              <li>Website design</li>
              <li>Web development</li>
              <li>Immigration</li>
            </ul>
            <a
              className="btn work-cta"
              href="https://nextstep-immigration.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit live website <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.article>
        <div className="work-shadow" aria-hidden="true" />
      </div>
    </section>
  );
}
