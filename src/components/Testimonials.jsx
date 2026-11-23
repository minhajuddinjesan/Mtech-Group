import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import Placeholder from './Placeholder.jsx';
import { clients, testimonials } from '../data/content.js';

function Carousel() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  // Moves to the next quote every 7 seconds
  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, [i]);

  return (
    <div className="quote-stage">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={i}
          className="quote"
          initial={{ opacity: 0, rotateY: -35, x: 60 }}
          animate={{ opacity: 1, rotateY: 0, x: 0 }}
          exit={{ opacity: 0, rotateY: 35, x: -60 }}
          transition={{ duration: 0.5 }}
          style={{ transformPerspective: 1000 }}
        >
          <p>“{t.quote}”</p>
          <footer><b>{t.name}</b>{t.role && <span>{t.role}</span>}</footer>
        </motion.blockquote>
      </AnimatePresence>
      {testimonials.length > 1 && (
        <div className="quote-dots" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((q, n) => (
            <button key={q.name + n} role="tab" aria-selected={n === i} aria-label={`Testimonial from ${q.name}`} onClick={() => setI(n)} className={n === i ? 'active' : ''} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Testimonials() {
  // On the live site the whole section disappears until there is real content
  if (!testimonials.length && !clients.length && !import.meta.env.DEV) return null;

  return (
    <section id="testimonials" className="section">
      <p className="eyebrow">Clients</p>
      <Reveal>What clients <span className="grad">say</span></Reveal>
      {testimonials.length ? <Carousel /> : (
        <Placeholder title="Client testimonials (quote, name, role)">Add real quotes to `testimonials` in src/data/content.js. This section stays hidden on the live site until you do.</Placeholder>
      )}
      {clients.length ? (
        <div className="logos" aria-label="Clients we have worked with">
          {/* The row is duplicated so it can scroll in an endless loop */}
          <div className="logos-track">
            {[...clients, ...clients].map((c, n) => (
              <span key={c.name + n} className="logo-chip" aria-hidden={n >= clients.length}>
                {c.logo ? <img src={c.logo} alt={c.name} loading="lazy" /> : c.name}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <Placeholder title="Client logo strip">Add clients to `clients` in src/data/content.js.</Placeholder>
      )}
    </section>
  );
}
