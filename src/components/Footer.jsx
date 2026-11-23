import Reveal from './Reveal.jsx';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <Reveal>Let’s build <span className="grad">together</span></Reveal>
      <p>hello@mtechgroup.be</p>
      <small>© {new Date().getFullYear()} M Tech Group · A Minhaj Group company</small>
    </footer>
  );
}
