import { services } from '../data/services.js';
import ServiceCard from './ServiceCard.jsx';
import Reveal from './Reveal.jsx';

export default function Services() {
  return (
    <section id="services" className="section">
      <Reveal>Our <span className="grad">Services</span></Reveal>
      <div className="grid">
        {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
      </div>
    </section>
  );
}
