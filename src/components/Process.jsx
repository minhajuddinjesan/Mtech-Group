import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';

const steps = ['Discover', 'Design', 'Develop', 'Deliver'];

export default function Process() {
  return (
    <section id="process" className="section">
      <Reveal>How we <span className="grad">work</span></Reveal>
      <div className="steps">
        <motion.span
          className="steps-line"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {steps.map((s, i) => (
          // Each step is a thick disc that flips over like a coin as it arrives
          <motion.div key={s} className="step"
            initial={{ opacity: 0, rotateY: -180, y: 40 }}
            whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
            whileHover={{ rotateY: 18, rotateX: -10, y: -8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.18, type: 'spring', damping: 14, stiffness: 80 }}
            style={{ transformPerspective: 700 }}>
            <b>0{i + 1}</b><span>{s}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
