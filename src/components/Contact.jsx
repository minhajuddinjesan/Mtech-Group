import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { services } from '../data/services.js';
import { contact } from '../data/content.js';

const budgets = ['Under €500', '€500 – €1,500', '€1,500 – €5,000', 'Over €5,000', 'Not sure yet'];

export const whatsappLink = (text = '') =>
  contact.whatsapp ? `https://wa.me/${contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}` : '';

// The form is emailed to you through FormSubmit (see submit below).
// If that fails, it opens the visitor's email app with the request written out, so no lead is lost.
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  // idle | sending | sent | mailto | error
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const body = () =>
    [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Service: ${form.service || 'Not specified'}`,
      `Budget: ${form.budget || 'Not specified'}`,
      '',
      form.message,
    ].join('\n');

  const openMailApp = () => {
    const subject = `Quote request: ${form.service || 'New project'} from ${form.name}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body())}`;
    setStatus('mailto');
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) err.message = 'Tell us a little about your project (at least 10 characters).';
    setErrors(err);
    if (Object.keys(err).length) return;

    setStatus('sending');
    setServerError('');
    try {
      // FormSubmit (formsubmit.co) emails every request to contact.email. Free, no account, no server.
      // The very first request sends an "Activate" email to that inbox; after one click, all requests arrive.
      const r = await fetch(`https://formsubmit.co/ajax/${contact.formAlias || contact.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name: form.name,
          email: form.email, // FormSubmit sets this as Reply-To, so pressing Reply answers the visitor
          Service: form.service || 'Not specified',
          Budget: form.budget || 'Not specified',
          Message: form.message,
          _subject: `New quote request: ${form.service || 'New project'} from ${form.name}`,
          _replyto: form.email,
          _template: 'table',
          _honey: form.website, // spam bots fill this hidden field; FormSubmit then drops the request
          _url: window.location.href,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && String(data.success) === 'true') { setStatus('sent'); return; }
      // Not activated yet, blocked, or down: let the visitor send it from their own email app instead
      console.warn('FormSubmit did not accept the request:', data.message || r.status);
      openMailApp();
    } catch {
      openMailApp();
    }
  };

  if (status === 'sent') {
    return (
      <section id="contact" className="section contact">
        <p className="eyebrow">Contact</p>
        <Reveal>Thank <span className="grad">you!</span></Reveal>
        <motion.div className="form-success" role="status" initial={{ opacity: 0, scale: 0.8, rotateX: 30 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} transition={{ type: 'spring', damping: 14 }} style={{ transformPerspective: 900 }}>
          <span aria-hidden="true">✓</span>
          <h3>Your request is on its way</h3>
          <p>We’ve received your message and will reply to {form.email} soon.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="section contact">
      <p className="eyebrow">Contact</p>
      <Reveal>Let’s build <span className="grad">together</span></Reveal>
      <div className="contact-grid">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Tell us about your project</h3>
          <p>Fill in the form and we will get back to you with a plan and a price. Prefer to talk directly? Reach us here:</p>
          <ul>
            <li><span aria-hidden="true">✉️</span><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            {contact.phone && <li><span aria-hidden="true">📞</span><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>}
            {contact.whatsapp && <li><span aria-hidden="true">💬</span><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></li>}
            {contact.location && <li><span aria-hidden="true">📍</span>{contact.location}</li>}
          </ul>
        </motion.div>

        <motion.form
          className="quote-form"
          onSubmit={submit}
          noValidate
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ transformPerspective: 1000 }}
        >
          <div className="field-row">
            <label>
              <span>Name</span>
              <input value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
              {errors.name && <em id="err-name">{errors.name}</em>}
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} />
              {errors.email && <em id="err-email">{errors.email}</em>}
            </label>
          </div>
          <div className="field-row">
            <label>
              <span>Service</span>
              <select value={form.service} onChange={set('service')}>
                <option value="">Choose a service</option>
                {services.map((s) => <option key={s.id}>{s.title}</option>)}
                <option>Something else</option>
              </select>
            </label>
            <label>
              <span>Budget <small>(optional)</small></span>
              <select value={form.budget} onChange={set('budget')}>
                <option value="">Choose a range</option>
                {budgets.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
          </div>
          <label>
            <span>Project details</span>
            <textarea rows={5} value={form.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} placeholder="What do you need, and by when?" />
            {errors.message && <em id="err-message">{errors.message}</em>}
          </label>
          {/* Hidden from people; spam bots fill it in and get ignored by the server */}
          <label className="hp" aria-hidden="true">
            Website <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
          </label>
          <p className="form-consent">
            By sending this form you agree that we use your details to answer your request, as described in our{' '}
            <a href="/privacy.html">privacy policy</a>.
          </p>
          <button className="btn" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send quote request'}
          </button>
          {status === 'error' && <p className="form-note form-error" role="alert">{serverError}</p>}
          {status === 'mailto' && (
            <p className="form-note" role="status">
              Your email app should open with your request ready to send. If it didn’t, email us at{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              {contact.whatsapp && <> or <a href={whatsappLink(body())} target="_blank" rel="noopener noreferrer">send it on WhatsApp</a></>}.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
