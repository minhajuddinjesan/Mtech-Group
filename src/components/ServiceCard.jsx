import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { startCheckout } from '../lib/checkout.js';
import { isTouch } from '../lib/device.js';

export default function ServiceCard({ service, index }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touch] = useState(isTouch);
  const ref = useRef();

  // Mouse: the card tilts toward the pointer and a light glare follows it
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const hoverRx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 200, damping: 18 });
  const hoverRy = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 18 });
  const gx = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const gy = useTransform(my, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,.18), transparent 55%)`;

  // Touch: no hover, so the card rocks gently as it scrolls past instead
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scrollRx = useSpring(useTransform(scrollYProgress, [0, 1], [12, -12]), { stiffness: 120, damping: 20 });

  const onMove = (e) => {
    if (touch) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const buy = async () => {
    setError('');
    setLoading(true);
    try {
      await startCheckout(service.id);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      className="card"
      style={{ rotateX: touch ? scrollRx : hoverRx, rotateY: touch ? 0 : hoverRy, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.12, duration: 0.7 }}
    >
      {!touch && <motion.div className="card-glare" style={{ background: glare }} aria-hidden="true" />}
      <div className="card-icon">{service.icon}</div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <div className="card-foot">
        <span className="price">from €{service.price}</span>
        <button className="btn small" onClick={buy} disabled={loading}>
          {loading ? 'Redirecting…' : 'Buy now'}
        </button>
      </div>
      {error && <p className="checkout-error" role="alert">{error}</p>}
    </motion.div>
  );
}
