import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Glowing trailing cursor
export default function Cursor() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  useEffect(() => {
    const move = (e) => { x.set(e.clientX - 150); y.set(e.clientY - 150); };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} />;
}
