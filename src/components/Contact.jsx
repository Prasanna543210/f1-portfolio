import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import content from '../content/siteContent.json';

const iconClassName = 'w-5 h-5 text-f1red shrink-0';

const iconMap = {
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
      <path d="M8.5 3.5h2.2c.5 0 .9.3 1 .8l.8 4.1c.1.4-.1.8-.4 1.1l-1.7 1.4a15 15 0 0 0 4.7 4.7l1.4-1.7c.3-.3.7-.5 1.1-.4l4.1.8c.5.1.8.5.8 1v2.2c0 .8-.7 1.5-1.5 1.5A16.5 16.5 0 0 1 3.5 5c0-.8.7-1.5 1.5-1.5Z" />
    </svg>
  ),
  'map-pin': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
      <path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
      <path d="M9 19c-4.5 1.5-4.5-2-6-2" />
      <path d="M15 22v-2.5c0-.7.2-1.2.6-1.7-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.6-.1-.3-.4-1.4.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.7.6.7 1 1.6 1 2.6 0 3.6-2.2 4.4-4.3 4.6.4.5.6 1 .6 1.8V22" />
      <path d="M9 19c0 1-.3 1.9-1 2.5" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
      <path d="M6 9v12" />
      <path d="M6 5.5v.5" />
      <path d="M10 21v-7.2c0-1.9 1.2-3.3 3-3.3s3 1.4 3 3.3V21" />
      <path d="M10 14v7" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
      <path d="m9 18-6-6 6-6" />
      <path d="m15 6 6 6-6 6" />
      <path d="m14 5-4 14" />
    </svg>
  ),
};

const getIcon = (name) => iconMap[name?.toLowerCase()] || null;

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('/?contact=sent');

  useEffect(() => {
    setRedirectUrl(`${window.location.origin}/?contact=sent`);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const getContactHref = (item) => {
    if (item.label === 'EMAIL') {
      return `mailto:${content.contact.recipientEmail}`;
    }

    if (item.label === 'PHONE') {
      return `tel:${item.value.replace(/[^+\d]/g, '')}`;
    }

    return null;
  };

  const handleSubmit = () => {
    setSending(true);
  };

  const formAction = `https://formsubmit.co/${content.contact.formSubmitToken}`;

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 carbon-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-f1red/30 to-transparent" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-f1red/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-0.5 bg-f1red" />
            <span className="font-mono text-xs tracking-[0.3em] text-f1red">{content.contact.sectionNumber}</span>
          </div>
          <h2 className="section-title text-f1white">
            {content.contact.titlePrefix} <span className="text-f1red">{content.contact.titleHighlight}</span>
          </h2>
          <p className="text-f1silver/60 mt-3 font-mono text-sm">{content.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl text-f1silver leading-relaxed mb-8">
              {content.contact.intro}
            </p>

            <div className="space-y-4">
              {content.contact.details.map((item, i) => (
                <motion.a
                  key={item.label}
                  className="glass-card p-4 flex items-center gap-4 group cursor-pointer"
                  href={getContactHref(item) || undefined}
                  target={getContactHref(item) ? '_self' : undefined}
                  rel={getContactHref(item) ? undefined : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ x: 4, borderColor: 'rgba(225,6,0,0.5)' }}
                >
                  <span>{getIcon(item.icon)}</span>
                  <div>
                    <div className="font-mono text-xs text-f1red/70 tracking-wider">{item.label.toLowerCase()}</div>
                    <div className="text-f1white text-sm font-medium mt-0.5">{item.value}</div>
                  </div>
                  <span className="ml-auto text-f1red/30 group-hover:text-f1red transition-colors">→</span>
                </motion.a>
              ))}
            </div>

            {content.contact.socials?.length ? (
              <div className="mt-8">
                <h3 className="font-mono text-xs tracking-[0.3em] text-f1red mb-4">Social links</h3>
                <div className="flex flex-wrap gap-3">
                  {content.contact.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.value}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs px-4 py-2 border border-f1red/20 text-f1silver hover:border-f1red hover:text-f1white transition-all duration-200"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form
              action={formAction}
              method="POST"
              onSubmit={handleSubmit}
              className="glass-card p-8 space-y-6"
            >
                {/* Form header */}
                <div className="flex items-center gap-2 pb-4 border-b border-f1red/20">
                  <div className="w-2 h-2 rounded-full bg-f1red animate-pulse" />
                  <span className="font-mono text-xs text-f1red tracking-widest">Open channel — transmitting</span>
                </div>

                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value={`Portfolio inquiry from ${form.name || 'a visitor'}`} />
                <input type="hidden" name="_next" value={redirectUrl} />

                <div>
                  <label className="font-mono text-xs text-f1silver/50 tracking-wider block mb-2">Your name</label>
                  <input
                    className="f1-input"
                    type="text"
                    name="name"
                    placeholder="Lewis Hamilton"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-f1silver/50 tracking-wider block mb-2">Email</label>
                  <input
                    className="f1-input"
                    type="email"
                    name="email"
                    placeholder="lewis@mercedes.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-f1silver/50 tracking-wider block mb-2">Message</label>
                  <textarea
                    className="f1-input resize-none"
                    name="message"
                    placeholder="Tell me about the project..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-center relative overflow-hidden"
                  disabled={sending}
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="inline-block"
                      >⚙</motion.span>
                      {content.contact.form.sendingLabel}
                    </span>
                  ) : (
                    content.contact.form.submitLabel
                  )}
                </button>
              </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-f1steel/50 flex flex-col md:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-f1red flex items-center justify-center"
               style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}>
            <span className="font-display text-white text-xs">{content.site.initials}</span>
          </div>
          <span className="font-display text-f1silver tracking-widest text-sm">{content.site.ownerName}</span>
        </div>
        <p className="font-mono text-xs text-f1silver/30 tracking-wider">
          © {content.site.copyrightYear} — {content.contact.footerNote}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-f1red animate-pulse" />
          <span className="font-mono text-xs text-f1silver/30">{content.contact.footerStatus}</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
