import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import content from '../content/siteContent.json';

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-f1gray/20 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-f1red/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-0.5 bg-f1red" />
            <span className="font-mono text-xs tracking-[0.3em] text-f1red">{content.experience.sectionNumber}</span>
          </div>
          <h2 className="section-title text-f1white">
            {content.experience.titlePrefix.toUpperCase()} <span className="text-f1red">{content.experience.titleHighlight.toUpperCase()}</span>
          </h2>
          <p className="text-f1silver/60 mt-3 font-mono text-sm">{content.experience.subtitle}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center track line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-f1red via-f1red/50 to-transparent"
               style={{ transform: 'translateX(-50%)' }} />

          {/* Animated light on track */}
          <motion.div
            className="absolute left-4 md:left-1/2 w-1 h-12 bg-f1red blur-sm rounded-full"
            style={{ transform: 'translateX(-50%)' }}
            animate={{ top: ['0%', '90%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          <div className="space-y-8">
            {content.experience.items.map((exp, i) => (
              (() => {
                const isRevealSoonCard = Boolean(exp.revealSoon);

                return (
              <motion.div
                key={exp.year}
                className={`relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                {/* Spacer for alternating */}
                <div className="hidden md:block flex-1" />

                {/* Node dot */}
                <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-f1red glow-red" />
                  <div className="absolute inset-0 rounded-full bg-f1red animate-ping opacity-30" />
                </div>

                {/* Card */}
                <div className={`flex-1 ml-10 md:ml-0 ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  {isRevealSoonCard ? (
                    <div className="glass-card p-6 relative overflow-hidden bg-black/95 border border-f1red/35 min-h-[240px] flex items-center justify-center">
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black via-black to-f1dark/80" />
                      <div className="absolute inset-0 pointer-events-none border border-f1red/20" />
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-f1red to-transparent" />

                      <div className="relative z-10 text-center px-6">
                        <div className="font-mono text-[11px] tracking-[0.35em] text-f1red/70">IN PROGRESS</div>
                        <div className="font-display text-4xl md:text-5xl text-f1white mt-2 leading-none" style={{ textShadow: '0 0 18px rgba(225,6,0,0.45)' }}>
                          REVEAL SOON
                        </div>
                        <div className="mt-3 h-px w-28 mx-auto bg-gradient-to-r from-transparent via-f1red to-transparent" />
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card-hover p-6 relative overflow-hidden">
                      {/* Lap label */}
                      <div className="absolute top-4 right-4 font-mono text-xs text-f1red/30">{exp.lap}</div>

                      {/* Year badge */}
                      <div className="font-mono text-xs text-f1red mb-2 tracking-wider">{exp.year}</div>

                      <h3 className="font-display text-xl text-f1white tracking-wide">{exp.role}</h3>
                      <div className="flex items-center gap-2 mb-4 mt-1">
                        <span className="text-f1silver font-semibold text-sm">{exp.company}</span>
                        <span className="text-f1silver/30">·</span>
                        <span className="text-f1silver/50 text-sm">{exp.location}</span>
                      </div>

                      <p className="text-f1silver/60 text-sm leading-relaxed mb-4">{exp.desc}</p>

                      <div className="flex flex-wrap gap-2">
                        {(exp.tags || []).map(tag => (
                          <span key={tag} className="font-mono text-xs text-f1red/70 border border-f1red/20 px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Checkered corner */}
                      <div className="absolute bottom-0 left-0 flex">
                        {[...Array(3)].map((_, ci) => (
                          <div key={ci} className="flex flex-col">
                            {[...Array(3)].map((_, ri) => (
                              <div key={ri} className="w-3 h-3"
                                   style={{ backgroundColor: (ci + ri) % 2 === 0 ? 'rgba(225,6,0,0.1)' : 'transparent' }} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
                );
              })()
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
