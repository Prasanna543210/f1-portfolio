import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import content from '../content/siteContent.json';

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
                <div className="text-2xl mb-3">{card.icon}</div>
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
