import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { startCheckout } from '../lib/checkout.js';

export default function ServiceCard({ service, index }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 18 });

  const onMove = (e) => {
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
      className="card"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.12, duration: 0.7 }}
    >
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
