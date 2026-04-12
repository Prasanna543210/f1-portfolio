import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import content from '../content/siteContent.json';
import InteractiveGridBackground from './InteractiveGridBackground';

const StatCounter = ({ value, delay = 0 }) => {
  const raw = String(value ?? '');
  const numericPart = raw.replace(/[^\d.]/g, '');
  const target = Number.parseFloat(numericPart);
  const decimals = (numericPart.split('.')[1] || '').length;
  const prefix = (raw.match(/^[^\d]*/) || [''])[0];
  const suffix = (raw.match(/[^\d.]*$/) || [''])[0];
  const isNumeric = Number.isFinite(target);

  const getFormatted = (current) => {
    if (decimals > 0) {
      return `${prefix}${current.toFixed(decimals)}${suffix}`;
    }
    return `${prefix}${Math.round(current)}${suffix}`;
  };

  const [display, setDisplay] = useState(() => (isNumeric ? getFormatted(0) : raw));

  useEffect(() => {
    if (!isNumeric) return undefined;

    let raf;
    let timeoutId;
    const duration = 1400;
    const easeOutCubic = (t) => 1 - (1 - t) ** 3;

    const animate = (startTime) => {
      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeOutCubic(progress);
        setDisplay(getFormatted(target * eased));

        if (progress < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setDisplay(raw);
        }
      };

      raf = requestAnimationFrame(step);
    };

    timeoutId = setTimeout(() => {
      animate(performance.now());
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [delay, isNumeric, raw, target]);

  return display;
};

const Hero = () => {
  const hasHeroImage = Boolean(content.hero.profileImage?.trim());

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#0d0d0d]">
      {/* Interactive background grid */}
      <InteractiveGridBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-f1dark/60 via-transparent to-f1dark z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-f1dark via-transparent to-f1dark z-0" />
      {/* Red glow bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-48 bg-f1red/10 blur-3xl z-0" />

      {/* Racing stripes */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-f1red to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-f1red to-transparent z-10" />

      {/* Animated streak lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-f1red to-transparent z-10"
          style={{ top: `${30 + i * 20}%`, left: 0, right: 0 }}
          animate={{ x: ['-100%', '200%'], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2.5 + i * 0.5, delay: i * 0.8, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-28 pb-16 lg:pt-20 lg:min-h-screen lg:flex lg:items-center">
        <div className="w-full grid lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)] lg:gap-24 xl:gap-28 gap-12 items-start lg:items-center">
          {/* F1 profile container */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="relative p-[1.5px] overflow-hidden" style={{ clipPath: 'polygon(14px 0%, 100% 0%, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%, 0% 14px)' }}>
              <motion.div
                className="absolute inset-0"
                style={{ background: 'conic-gradient(from 0deg, rgba(225,6,0,0.1), rgba(225,6,0,0.95), rgba(245,245,245,0.35), rgba(225,6,0,0.95), rgba(225,6,0,0.1))' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
              />

              <div className="glass-card p-3 relative overflow-hidden" style={{ clipPath: 'polygon(14px 0%, 100% 0%, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%, 0% 14px)' }}>
                <div className="absolute inset-0 pointer-events-none border border-f1red/25" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-f1red via-f1white to-f1red" />
                <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.25em] text-f1red/70">DRIVER CARD</div>

                <div className="relative border border-f1red/30 rounded-sm overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
                  {hasHeroImage ? (
                    <img
                      src={content.hero.profileImage}
                      alt={content.hero.profileImageAlt || `${content.site.ownerName} profile`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-f1gray via-f1dark to-black flex items-center justify-center">
                      <span className="font-display text-7xl text-f1red/70 tracking-widest">{content.site.initials}</span>
                    </div>
                  )}

                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.65), rgba(10,10,10,0.1) 40%, transparent)' }} />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-f1silver/70">F1 PORTFOLIO</span>
                    <span className="font-display text-lg text-f1red">{content.site.initials}</span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="border border-f1red/20 px-2 py-1.5 text-center">
                    <div className="font-mono text-[10px] text-f1silver/50">ROLE</div>
                    <div className="font-mono text-[10px] text-f1white tracking-wider">DEV</div>
                  </div>
                  <div className="border border-f1red/20 px-2 py-1.5 text-center">
                    <div className="font-mono text-[10px] text-f1silver/50">STATUS</div>
                    <div className="font-mono text-[10px] text-f1red tracking-wider">ACTIVE</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="max-w-4xl lg:pl-2 xl:pl-4 relative">
            {/* Tagline */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-8 h-px bg-f1red" />
              <span className="font-mono text-xs tracking-[0.3em] text-f1red uppercase">{content.hero.eyebrow}</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h1 className="font-display text-f1white leading-none mb-2"
                  style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', letterSpacing: '0.05em' }}>
                {content.hero.headlinePrefix.toUpperCase()}
              </h1>
              <h1 className="font-display leading-none mb-6"
                  style={{
                    fontSize: 'clamp(3rem, 9vw, 8rem)',
                    letterSpacing: '0.05em',
                    color: '#E10600',
                    textShadow: '0 0 40px rgba(225,6,0,0.5)',
                  }}>
                {content.hero.headlineName.toUpperCase()}
              </h1>
            </motion.div>

            {/* Sub-heading */}
            <motion.p
              className="text-xl md:text-2xl text-f1silver font-light mb-4 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {content.hero.subheadline}
            </motion.p>

            <motion.p
              className="font-mono text-sm text-f1silver/60 mb-10 tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {content.hero.roleLine}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <button className="btn-primary" onClick={() => scrollTo('projects')}>
                {content.hero.primaryCta.toUpperCase()}
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('contact')}>
                {content.hero.secondaryCta.toUpperCase()}
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-8 mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {content.hero.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  <div className="font-display text-3xl text-f1red" style={{ textShadow: '0 0 20px rgba(225,6,0,0.4)' }}>
                    <StatCounter value={stat.value} delay={1.15 + i * 0.12} />
                  </div>
                  <div className="font-mono text-xs text-f1silver tracking-wider mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={() => scrollTo('about')}
        style={{ cursor: 'pointer' }}
      >
        <span className="font-mono text-xs text-f1silver/50 tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-f1red to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
