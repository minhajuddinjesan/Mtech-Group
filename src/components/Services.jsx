import { services } from '../data/services.js';
import ServiceCard from './ServiceCard.jsx';

export default function Services() {
  return (
    <section id="services" className="section">
      <h2>Our <span className="grad">Services</span></h2>
      <div className="grid">
        {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
      </div>
    </section>
  );
}
