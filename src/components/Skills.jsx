import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import content from '../content/siteContent.json';

const SkillBar = ({ skill, index, inView }) => {
  const color = content.skills.categoryColors[skill.category] || '#E10600';
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-semibold text-f1white text-sm">{skill.name}</span>
          <span className="font-mono text-xs px-2 py-0.5 rounded"
                style={{ color, background: `${color}20`, border: `1px solid ${color}40` }}>
            {skill.category}
          </span>
        </div>
        <motion.span
          className="font-mono text-sm font-bold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.4 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Track (background bar) */}
      <div className="relative h-3 bg-f1steel rounded-sm overflow-hidden">
        {/* Track lines */}
        {[25, 50, 75].map(tick => (
          <div key={tick} className="absolute top-0 bottom-0 w-px bg-f1dark/60 z-10"
               style={{ left: `${tick}%` }} />
        ))}

        {/* Progress bar */}
        <motion.div
          className="h-full relative"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: index * 0.08 + 0.2, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          {/* Leading edge glow */}
          <div className="absolute right-0 top-0 bottom-0 w-4 blur-sm"
               style={{ background: color, opacity: 0.8 }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 carbon-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-f1red/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-0.5 bg-f1red" />
            <span className="font-mono text-xs tracking-[0.3em] text-f1red">{content.skills.sectionNumber}</span>
          </div>
          <h2 className="section-title text-f1white">
            {content.skills.titlePrefix.toUpperCase()} <span className="text-f1red">{content.skills.titleHighlight.toUpperCase()}</span>
          </h2>
          <p className="text-f1silver/60 mt-3 font-mono text-sm">{content.skills.subtitle}</p>
        </motion.div>

        {/* Dashboard frame */}
        <div className="glass-card p-8 relative overflow-hidden">
          {/* Dashboard header bar */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-f1red/20">
            <div className="w-3 h-3 rounded-full bg-f1red animate-pulse" />
            <span className="font-mono text-xs text-f1red tracking-widest">{content.skills.dashboardLabel}</span>
            <div className="ml-auto font-mono text-xs text-f1silver/40">SYS_OK</div>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-12">
            <div>
              {content.skills.skills.slice(0, 4).map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} inView={inView} />
              ))}
            </div>
            <div>
              {content.skills.skills.slice(4).map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i + 4} inView={inView} />
              ))}
            </div>
          </div>

          {/* RPM indicator legend */}
          <div className="flex gap-4 mt-2 pt-4 border-t border-f1steel">
            {Object.entries(content.skills.categoryColors).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="font-mono text-xs text-f1silver/50">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-mono text-xs tracking-[0.3em] text-f1red mb-6">EQUIPMENT / TOOLING</h3>
          <div className="flex flex-wrap gap-3">
            {content.skills.tools.map((tool, i) => (
              <motion.span
                key={tool}
                className="font-mono text-xs px-4 py-2 border border-f1red/20 text-f1silver hover:border-f1red hover:text-f1white transition-all duration-200 cursor-default"
                style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.04 }}
                whileHover={{ backgroundColor: 'rgba(225,6,0,0.1)' }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
