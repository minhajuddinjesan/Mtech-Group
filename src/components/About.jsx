import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from './Reveal.jsx';
import Placeholder from './Placeholder.jsx';
import { stats, team } from '../data/content.js';

// Each point is something the site already offers, so nothing here is a made-up claim
const pillars = [
  { icon: '🧩', title: 'Everything in one place', text: 'Websites, apps, video editing and IT security from one team, so your brand looks and works the same everywhere.' },
  { icon: '⚡', title: 'Modern technology', text: 'Fast, responsive builds with modern React tooling, 3D and motion that make your business stand out.' },
  { icon: '🔒', title: 'Secure by default', text: 'Security is part of every project, and online payments run through Stripe.' },
  { icon: '🤝', title: 'A clear process', text: 'Discover, design, develop, deliver. You always know what happens next.' },
];

function Counter({ value, suffix = '' }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1400);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);
  return <b ref={ref}>{n}{suffix}</b>;
}

const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

export default function About() {
  return (
    <section id="about" className="section about">
      <p className="eyebrow">About us</p>
      <Reveal>Why <span className="grad">M Tech</span></Reveal>
      <p className="section-lead">
        We are a digital studio in Antwerp, Belgium helping ambitious businesses look great online and run smoothly behind the scenes.
      </p>

      <div className="pillars">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            className="pillar"
            initial={{ opacity: 0, y: 50, rotateY: -25 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.1, type: 'spring', damping: 18 }}
            style={{ transformPerspective: 900 }}
          >
            <span className="pillar-icon" aria-hidden="true">{p.icon}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </motion.div>
        ))}
      </div>

      {stats.length > 0 ? (
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat"><Counter value={s.value} suffix={s.suffix} /><span>{s.label}</span></div>
          ))}
        </div>
      ) : (
        <Placeholder title="Stats row (e.g. projects delivered, happy clients)">Add real numbers to `stats` in src/data/content.js.</Placeholder>
      )}

      {(team.length > 0 || import.meta.env.DEV) && <h3 className="sub-heading">Meet the team</h3>}
      {team.length > 0 ? (
        <div className="team">
          {team.map((m, i) => (
            <motion.figure
              key={m.name}
              className="member"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, rotateX: 6 }}
              style={{ transformPerspective: 700 }}
            >
              {m.photo ? <img src={m.photo} alt={m.name} loading="lazy" /> : <span className="avatar">{initials(m.name)}</span>}
              <figcaption><b>{m.name}</b><span>{m.role}</span></figcaption>
            </motion.figure>
          ))}
        </div>
      ) : (
        <Placeholder title="Team members with name, role and photo">Add people to `team` in src/data/content.js. Photos go in /public/team/.</Placeholder>
      )}
    </section>
  );
}
