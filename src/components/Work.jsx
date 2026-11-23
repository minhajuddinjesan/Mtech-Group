import { motion } from 'framer-motion';

export default function Work() {
  return (
    <section id="work" className="section work-section">
      <p className="eyebrow">A recent project</p>
      <h2>Work we're <span className="grad">proud of</span></h2>
      <motion.article
        className="work-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="work-preview" aria-label="Preview of the NextStep Immigration website">
          <div className="preview-browser">
            <div className="preview-dots" aria-hidden="true"><i /><i /><i /></div>
            <span>nextstep-immigration.com</span>
          </div>
          <div className="preview-content">
            <span className="preview-brand">next<span>step</span></span>
            <span className="preview-kicker">STUDY · WORK · RESIDENCY VISAS</span>
            <h3>Your next step starts with the right paperwork, done right.</h3>
            <p>Clear guidance for your journey abroad.</p>
            <span className="preview-link">Explore your options&nbsp; ↗</span>
          </div>
          <div className="preview-orb" aria-hidden="true" />
        </div>
        <div className="work-details">
          <div className="work-heading">
            <div>
              <p className="work-label">LIVE WEBSITE</p>
              <h3>NextStep Immigration</h3>
            </div>
            <span className="work-arrow" aria-hidden="true">↗</span>
          </div>
          <p className="work-description">
            A welcoming online home for immigration guidance, helping students,
            professionals, and families understand their next steps.
          </p>
          <ul className="work-tags" aria-label="Project highlights">
            <li>Website design</li>
            <li>Web development</li>
            <li>Immigration</li>
          </ul>
          <a
            className="btn work-cta"
            href="https://nextstep-immigration.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit live website <span aria-hidden="true">↗</span>
          </a>
        </div>
      </motion.article>
    </section>
  );
}
