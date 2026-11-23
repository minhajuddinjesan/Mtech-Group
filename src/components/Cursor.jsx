import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { isTouch } from '../lib/device.js';

// Glowing trailing cursor (mouse only)
export default function Cursor() {
  const [touch] = useState(isTouch);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  useEffect(() => {
    if (touch) return;
    const move = (e) => { x.set(e.clientX - 150); y.set(e.clientY - 150); };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y, touch]);
  if (touch) return null;
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} />;
}
