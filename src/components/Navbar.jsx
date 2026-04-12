import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../content/siteContent.json';

const navLinks = content.navigation.links;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(225,6,0,0.2)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 bg-f1red flex items-center justify-center"
               style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}>
            <span className="font-display text-white text-sm leading-none">{content.site.initials}</span>
          </div>
          <span className="font-display text-xl tracking-widest text-f1white">
            {content.site.ownerName.split(' ')[0].toUpperCase()} <span className="text-f1red">{content.site.ownerName.split(' ').slice(1).join(' ').toUpperCase()}</span>
          </span>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.button
              key={link}
              onClick={() => scrollTo(link)}
              className="font-mono text-xs tracking-widest uppercase transition-colors duration-200 relative group"
              style={{ color: active === link ? '#E10600' : '#C0C0C0' }}
              whileHover={{ color: '#E10600' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <span className="text-f1red mr-1 opacity-60">{String(i + 1).padStart(2, '0')}.</span>
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-f1red transition-all duration-200 group-hover:w-full" />
            </motion.button>
          ))}
          <motion.button
            className="btn-primary text-sm py-2 px-5"
            onClick={() => scrollTo('Contact')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {content.navigation.cta.toUpperCase()}
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block h-0.5 bg-f1white"
              style={{ width: i === 1 ? '24px' : '20px' }}
              animate={mobileOpen ? {
                rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                y: i === 0 ? 8 : i === 2 ? -8 : 0,
                opacity: i === 1 ? 0 : 1,
              } : { rotate: 0, y: 0, opacity: 1 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-f1dark border-t border-f1red/20 px-6 py-4 flex flex-col gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left font-mono text-sm tracking-widest uppercase text-f1silver hover:text-f1red transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}
              >
                <span className="text-f1red mr-2">{String(i + 1).padStart(2, '0')}.</span>{link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
