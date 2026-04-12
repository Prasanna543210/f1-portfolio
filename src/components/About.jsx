import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import content from '../content/siteContent.json';

const iconClassName = 'w-6 h-6 text-f1red';

const iconMap = {
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
      <path d="M9 4a3 3 0 0 0-3 3v1.2A2.8 2.8 0 0 0 4 11a3 3 0 0 0 1 2.2V15a3 3 0 0 0 3 3h1" />
      <path d="M15 4a3 3 0 0 1 3 3v1.2A2.8 2.8 0 0 1 20 11a3 3 0 0 1-1 2.2V15a3 3 0 0 1-3 3h-1" />
      <path d="M9 4a3 3 0 0 1 6 0v16a3 3 0 0 1-6 0V4Z" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <path d="M8 7h.01M8 17h.01M12 7h4M12 17h4" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
      <path d="M14 4c2.2 0 4 1.8 4 4 0 4.5-3.6 8.5-7.2 10.8-.6.4-1.4.3-1.9-.2l-.7-.7-.7.7c-.5.5-1.3.6-1.9.2C4 16.5 3 14.2 3 12c0-3.9 3.1-8 8-8h3Z" />
      <path d="M15 9l-3 3" />
      <path d="M10 14l-2 2" />
      <path d="M15.5 4.5 19 1l1 4-3.5 3.5" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true">
      <path d="M8 4h8v2a4 4 0 0 1-8 0V4Z" />
      <path d="M7 6H5a2 2 0 0 0 2 2" />
      <path d="M17 6h2a2 2 0 0 1-2 2" />
      <path d="M10 14h4" />
      <path d="M12 16v3" />
      <path d="M9 19h6" />
      <path d="M8 4v2a4 4 0 0 0 8 0V4" />
    </svg>
  ),
};

const getCardIcon = (name) => iconMap[name?.toLowerCase()] || null;

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
    })
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-f1dark via-f1gray/20 to-f1dark" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-0.5 bg-f1red" />
            <span className="font-mono text-xs tracking-[0.3em] text-f1red">{content.about.sectionNumber}</span>
          </div>
          <h2 className="section-title text-f1white">
            {content.about.titlePrefix.toUpperCase()} <span className="text-f1red">{content.about.titleHighlight.toUpperCase()}</span> {content.about.titleSuffix.toUpperCase()}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card p-8 relative overflow-hidden racing-stripe">
              {/* Driver number watermark */}
              <div className="absolute -right-4 -top-4 font-display text-[120px] text-f1red/5 leading-none select-none">
                16
              </div>

              <p className="text-f1silver leading-relaxed mb-6 text-lg">
                {content.about.bio[0]}
              </p>
              <p className="text-f1silver/70 leading-relaxed mb-8">
                {content.about.bio[1]}
              </p>

              {/* Driver card stats */}
              <div className="grid grid-cols-2 gap-4">
                {content.about.facts.map(({ label, value }) => (
                  <div key={label} className="border-l-2 border-f1red/40 pl-3">
                    <div className="font-mono text-xs text-f1red/70 tracking-wider">{label}</div>
                    <div className="font-semibold text-f1white text-sm mt-0.5">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Attribute cards */}
          <div className="grid grid-cols-2 gap-4">
            {content.about.cards.map((card, i) => (
              <motion.div
                key={card.title}
                className="glass-card-hover p-5"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <div className="mb-3 flex items-center">{getCardIcon(card.icon)}</div>
                <h3 className="font-display text-f1white text-lg tracking-wide mb-2">{card.title}</h3>
                <p className="text-f1silver/60 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
