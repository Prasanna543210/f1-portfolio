import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import content from '../content/siteContent.json';

const ProjectCard = ({ project, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative group speed-hover"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="glass-card h-full p-6 relative overflow-hidden flex flex-col transition-all duration-300"
        style={{
          borderColor: hovered ? `${project.color}60` : 'rgba(225,6,0,0.15)',
          boxShadow: hovered ? `0 0 30px ${project.color}20, 0 12px 40px rgba(0,0,0,0.4)` : 'none',
        }}
      >
        {/* Top bar */}
        <div className="flex justify-between items-start mb-4">
          <span className="font-display text-5xl leading-none opacity-10" style={{ color: project.color }}>
            {project.number}
          </span>
          <div className="flex gap-3">
            <a href={project.github}
               className="font-mono text-xs text-f1silver/40 hover:text-f1white transition-colors tracking-wider"
               onClick={e => e.preventDefault()}>
              GH ↗
            </a>
            <a href={project.live}
               className="font-mono text-xs hover:text-f1white transition-colors tracking-wider"
               style={{ color: `${project.color}80` }}
               onClick={e => e.preventDefault()}>
              LIVE ↗
            </a>
          </div>
        </div>

        {/* Progress bar indicator */}
        <div className="h-0.5 w-full bg-f1steel mb-5 overflow-hidden rounded-full">
          <motion.div
            className="h-full"
            style={{ backgroundColor: project.color }}
            initial={{ width: 0 }}
            animate={hovered ? { width: '100%' } : { width: '30%' }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <h3 className="font-display text-2xl text-f1white tracking-wide mb-3">{project.title}</h3>
        <p className="text-f1silver/60 text-sm leading-relaxed flex-1">{project.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tags.map(tag => (
            <span key={tag} className="font-mono text-xs px-2 py-1 rounded-sm"
                  style={{ color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}30` }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-8 h-8 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-0 h-0"
               style={{ borderLeft: '32px solid transparent', borderBottom: `32px solid ${project.color}30` }} />
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-f1red/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-0.5 bg-f1red" />
            <span className="font-mono text-xs tracking-[0.3em] text-f1red">{content.projects.sectionNumber}</span>
          </div>
          <h2 className="section-title text-f1white">
            {content.projects.titlePrefix.toUpperCase()} <span className="text-f1red">{content.projects.titleHighlight.toUpperCase()}</span>
          </h2>
          <p className="text-f1silver/60 mt-3 font-mono text-sm">{content.projects.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.projects.items.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a href="#" className="btn-secondary inline-block" onClick={e => e.preventDefault()}>
            VIEW ALL ON GITHUB
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
