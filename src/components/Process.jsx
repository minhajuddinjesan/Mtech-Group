import { motion } from 'framer-motion';

const steps = ['Discover', 'Design', 'Develop', 'Deliver'];

export default function Process() {
  return (
    <section id="process" className="section">
      <h2>How we <span className="grad">work</span></h2>
      <div className="steps">
        {steps.map((s, i) => (
          <motion.div key={s} className="step"
            initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: i * 0.15, type: 'spring' }}>
            <b>0{i + 1}</b><span>{s}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
