import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal.jsx';

const projects = [
  {
    id: 'nextstep',
    name: 'NextStep Immigration',
    label: 'LIVE WEBSITE',
    url: 'https://nextstep-immigration.com/',
    domain: 'nextstep-immigration.com',
    description:
      'A welcoming online home for immigration guidance, helping students, professionals, and families understand their next steps.',
    tags: ['Website design', 'Web development', 'Immigration'],
    preview: (
      <>
        <span className="preview-brand">next<span>step</span></span>
        <span className="preview-kicker">STUDY · WORK · RESIDENCY VISAS</span>
        <h3>Your next step starts with the right paperwork, done right.</h3>
        <p>Clear guidance for your journey abroad.</p>
        <span className="preview-link">Explore your options&nbsp; ↗</span>
      </>
    ),
  },
  {
    id: 'pinkish',
    name: 'Pinkish',
    label: 'LIVE ONLINE SHOP',
    url: 'https://pinkish.shop/',
    domain: 'pinkish.shop',
    description:
      'A playful online shop for gifts, clothing, beauty and baby products, with category browsing, a cart and order tracking for customers in Chattogram.',
    tags: ['E-commerce', 'Web app design', 'Web development'],
    preview: (
      <div className="pk-app">
        <aside className="pk-side">
          <span className="pk-logo">♡ Pinkish</span>
          <i className="pk-nav active">Home</i>
          <i className="pk-nav">Categories</i>
          <i className="pk-nav">Cart</i>
          <i className="pk-nav">Orders</i>
        </aside>
        <div className="pk-main">
          <span className="pk-search">What are you looking for?</span>
          <div className="pk-banner"><b>New arrivals</b><small>Gifts · Makeup · Bags</small></div>
          <div className="pk-cats">
            {['Gift', 'Clothing', 'Baby', 'Toys', 'Makeup'].map((c) => (
              <span key={c}><i />{c}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

function WorkCard({ project, reverse }) {
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
  const barX = useTransform(sx, (v) => v * 6);
  const barY = useTransform(sy, (v) => v * 6);
  const contentX = useTransform(sx, (v) => v * 14);
  const contentY = useTransform(sy, (v) => v * 14);
  const orbX = useTransform(sx, (v) => v * -22);
  const orbY = useTransform(sy, (v) => v * -22);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <div className="work-stage">
      <motion.article
        ref={card}
        className={`work-card${reverse ? ' reverse' : ''}`}
        style={{ rotateX: tilt, scale, y: lift, transformPerspective: 1200, transformOrigin: '50% 100%' }}
      >
        <div
          className={`work-preview preview-${project.id}`}
          aria-label={`Preview of the ${project.name} website`}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <motion.div className="preview-browser" style={{ x: barX, y: barY }}>
            <div className="preview-dots" aria-hidden="true"><i /><i /><i /></div>
            <span>{project.domain}</span>
          </motion.div>
          <motion.div className="preview-content" style={{ x: contentX, y: contentY }}>
            {project.preview}
          </motion.div>
          <motion.div className="preview-orb" aria-hidden="true" style={{ x: orbX, y: orbY }} />
        </div>
        <div className="work-details">
          <div className="work-heading">
            <div>
              <p className="work-label">{project.label}</p>
              <h3>{project.name}</h3>
            </div>
            <span className="work-arrow" aria-hidden="true">↗</span>
          </div>
          <p className="work-description">{project.description}</p>
          <ul className="work-tags" aria-label="Project highlights">
            {project.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <a className="btn work-cta" href={project.url} target="_blank" rel="noopener noreferrer">
            Visit live website <span aria-hidden="true">↗</span>
          </a>
        </div>
      </motion.article>
      <div className="work-shadow" aria-hidden="true" />
    </div>
  );
}

// Each tab lists the projects whose id is in `projects`; add an id here to show a project in that tab
const categories = [
  { id: 'websites', label: 'Websites', icon: '🌐', projects: ['nextstep', 'pinkish'] },
  {
    id: 'apps', label: 'Apps', icon: '📱', projects: [],
    empty: 'Our app showcase is on its way. Have an app idea? We design and build mobile and web apps from first sketch to launch.',
  },
  {
    id: 'other', label: 'Video & IT', icon: '🎬', projects: [],
    empty: 'Video edits, motion graphics and IT support projects are coming here soon. Ask us for samples in the meantime.',
  },
];

function EmptyCategory({ category }) {
  return (
    <div className="work-empty">
      <span className="work-empty-icon" aria-hidden="true">{category.icon}</span>
      <h3>{category.label}: coming soon</h3>
      <p>{category.empty}</p>
      <a href="#contact" className="btn">Start a project</a>
    </div>
  );
}

export default function Work() {
  const [active, setActive] = useState(categories[0].id);
  const category = categories.find((c) => c.id === active);
  const list = category.projects.map((id) => projects.find((p) => p.id === id));

  return (
    <section id="work" className="section work-section">
      <p className="eyebrow">Recent projects</p>
      <Reveal>Work we're <span className="grad">proud of</span></Reveal>
      <div className="work-tabs" role="tablist" aria-label="Project categories">
        {categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            id={`tab-${c.id}`}
            aria-selected={active === c.id}
            aria-controls="work-panel"
            className={`work-tab${active === c.id ? ' active' : ''}`}
            onClick={() => setActive(c.id)}
          >
            {/* The glowing pill slides between tabs */}
            {active === c.id && <motion.span layoutId="work-tab-pill" className="work-tab-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
            <span className="work-tab-label">{c.label}</span>
            {c.projects.length > 0 && <span className="work-tab-count">{c.projects.length}</span>}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {/* Switching tabs swings the old panel away and the new one in, like turning a page */}
        <motion.div
          key={active}
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="work-list"
          initial={{ opacity: 0, rotateX: -12, y: 40 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: 12, y: -30 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ transformPerspective: 1200 }}
        >
          {list.length
            ? list.map((p, i) => <WorkCard key={p.id} project={p} reverse={i % 2 === 1} />)
            : <EmptyCategory category={category} />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
