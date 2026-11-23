// ─────────────────────────────────────────────────────────────
// Site content. Edit this file to fill the site with real details.
//
// Anything left empty ('' or []) is HIDDEN on the live site.
// While you run `npm run dev`, empty sections show a dashed
// "placeholder" box instead, so you can see where content goes.
// Never put made-up quotes, clients or numbers here.
// ─────────────────────────────────────────────────────────────

export const contact = {
  // Quote requests from the website are emailed here.
  email: 'm.techgroup@outlook.com',
  // Optional: after you activate FormSubmit, it emails you a random code. Paste it here to hide your email address from spam bots.
  formAlias: '',
  // WhatsApp number in international format, digits only, e.g. '32470123456'. Empty hides the button.
  whatsapp: '32472742815',
  // Shown in the footer and contact section. Empty hides it.
  phone: '+32 472 74 28 15',
  location: 'Antwerp, Belgium',
};

// Full URLs. Empty ones are hidden.
export const socials = {
  instagram: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  tiktok: '',
};

// Real quotes from real clients only, with their permission.
// Example: { quote: 'They rebuilt our site in two weeks…', name: 'Jane Doe', role: 'Owner, Example Bakery' }
export const testimonials = [];

// Client or partner names (and optional logo image paths in /public).
// Example: { name: 'NextStep Immigration', logo: '/logos/nextstep.svg' }
export const clients = [];

// Team members. photo is optional (put images in /public/team/).
// Example: { name: 'Minhaj', role: 'Founder & Lead Developer', photo: '/team/minhaj.jpg' }
export const team = [];

// Real numbers only. Example: { value: 25, suffix: '+', label: 'Projects delivered' }
export const stats = [];

// Answers use only facts already on the site. Review and adjust them to match how you work.
export const faqs = [
  {
    q: 'What services does M Tech offer?',
    a: 'Video editing, website development, app development, and IT support and security for businesses.',
  },
  {
    q: 'How much does a project cost?',
    a: 'Our services start from €99 for monthly IT support, €149 for video editing, €499 for a website and €1499 for an app. Every project is different, so send us a quote request and we will give you an exact price.',
  },
  {
    q: 'How does a project work?',
    a: 'We follow four steps: Discover, Design, Develop and Deliver. We start by understanding your goals, then design, build and launch it together with you.',
  },
  {
    q: 'How do I pay?',
    a: 'You can pay securely online by card through Stripe using the "Buy now" buttons, or ask us for an invoice when you request a quote.',
  },
  {
    q: 'Can you work with businesses outside Belgium?',
    a: 'Yes. We work remotely, so we can help clients wherever they are.',
  },
];
