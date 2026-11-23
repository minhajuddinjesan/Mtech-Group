import { motion } from 'framer-motion';

// Section heading that swings up out of the page as it scrolls into view
export default function Reveal({ as = 'h2', children, className, delay = 0 }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 50, rotateX: 45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, type: 'spring', damping: 18, stiffness: 90 }}
      style={{ transformPerspective: 800, transformOrigin: '50% 100%' }}
    >
      {children}
    </Tag>
  );
}
