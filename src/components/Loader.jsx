import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import content from '../content/siteContent.json';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | done

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setPhase('done');
          setTimeout(onComplete, 600);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exited' && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-f1dark overflow-hidden carbon-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Animated streaks */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-f1red to-transparent"
              style={{ top: `${20 + i * 20}%`, left: 0, right: 0 }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.2 + i * 0.3, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* Logo */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Racing welcome text */}
            <motion.div
              className="mb-6 relative"
              animate={{ x: phase === 'done' ? '120vw' : 0 }}
              transition={{ duration: 0.6, ease: 'easeIn' }}
            >
              <motion.h2
                className="section-title text-3xl sm:text-4xl tracking-[0.18em] text-f1white uppercase"
                animate={{
                  textShadow: [
                    '0 0 8px rgba(225,6,0,0.25)',
                    '0 0 18px rgba(225,6,0,0.7)',
                    '0 0 8px rgba(225,6,0,0.25)'
                  ]
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                Welcome To The Grid
              </motion.h2>

              <motion.p
                className="font-mono text-xs sm:text-sm text-f1silver tracking-[0.22em] mt-2"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: [0.45, 1, 0.45], y: [6, 0, 6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                RACING THROUGH MY PORTFOLIO
              </motion.p>

              <motion.div
                className="absolute left-0 right-0 -bottom-2 h-[2px] bg-gradient-to-r from-transparent via-f1red to-transparent"
                animate={{ x: ['-35%', '35%', '-35%'], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            <h1 className="section-title text-5xl text-f1white tracking-widest">
              {content.site.ownerName.toUpperCase()}
            </h1>
            <p className="font-mono text-f1silver text-sm tracking-widest mt-2">FULL STACK DEVELOPER</p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-72 mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-mono text-xs text-f1silver tracking-widest">SYSTEM BOOT</span>
              <span className="font-mono text-xs text-f1red">{Math.min(100, Math.round(progress))}%</span>
            </div>
            <div className="h-1 bg-f1steel rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-f1red"
                style={{ width: `${Math.min(100, progress)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            {/* RPM-style dots */}
            <div className="flex gap-1 mt-3 justify-center">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-4 rounded-sm transition-all duration-100"
                  style={{
                    backgroundColor: progress > i * 10
                      ? i > 7 ? '#FF4444' : i > 5 ? '#FFA500' : '#E10600'
                      : '#2A2A2A'
                  }}
                />
              ))}
            </div>
          </div>

          <motion.p
            className="font-mono text-xs text-f1silver tracking-widest"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            INITIALIZING RACE MODE...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
