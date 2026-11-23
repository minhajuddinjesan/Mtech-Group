import { services } from '../data/services.js';
import { contact, socials } from '../data/content.js';

const socialLabels = { instagram: 'Instagram', facebook: 'Facebook', linkedin: 'LinkedIn', youtube: 'YouTube', tiktok: 'TikTok' };

export default function Footer() {
  const links = Object.entries(socials).filter(([, url]) => url);
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#top" className="logo">M<span>Tech</span></a>
          <p>Websites, apps, video editing and IT security for ambitious businesses.</p>
          {links.length > 0 && (
            <ul className="socials" aria-label="Social media">
              {links.map(([k, url]) => (
                <li key={k}><a href={url} target="_blank" rel="noopener noreferrer">{socialLabels[k]}</a></li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Services">
          <h4>Services</h4>
          {services.map((s) => <a key={s.id} href="#services">{s.title}</a>)}
        </nav>
        <nav aria-label="Company">
          <h4>Company</h4>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div>
          <h4>Contact</h4>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>}
          {contact.location && <span>{contact.location}</span>}
          <a href="#contact" className="btn small footer-cta">Get a quote</a>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} M Tech · A Minhaj Group company</small>
        <small className="footer-legal"><a href="/privacy.html">Privacy policy</a> · Secure payments by Stripe</small>
      </div>
    </footer>
  );
}
