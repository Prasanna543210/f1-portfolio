import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import content from '../content/siteContent.json';

const iconStyle = { width: 16, height: 16 };

const PreviousIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle} aria-hidden="true">
    <path d="M19 20 9 12l10-8v16Z" />
    <path d="M5 19V5" />
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle} aria-hidden="true">
    <path d="m5 4 10 8-10 8V4Z" />
    <path d="M19 5v14" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} aria-hidden="true">
    <path d="M8 5v14l11-7Z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} aria-hidden="true">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

const MusicPulseIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${active ? 'text-f1red' : 'text-f1silver/80'}`} aria-hidden="true">
    <path d="M9 18V6l10-2v12" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="16" cy="16" r="3" />
  </svg>
);

const NanoMusicPlayer = () => {
  const songs = useMemo(() => content.music?.songs || [], []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);
  const shellRef = useRef(null);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) {
      return;
    }

    audio.load();
    setProgress(0);

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentIndex, currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePrevious = () => {
    if (songs.length === 0) {
      return;
    }

    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleNext = () => {
    if (songs.length === 0) {
      return;
    }

    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const togglePlay = () => {
    if (!currentSong) {
      return;
    }

    setIsPlaying((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) {
      setProgress(0);
      return;
    }

    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleEnded = () => {
    if (songs.length === 0) {
      return;
    }

    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (shellRef.current && !shellRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  if (!currentSong) {
    return null;
  }

  return (
    <motion.div
      ref={shellRef}
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
    >
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="music-panel"
            className="absolute bottom-0 right-0 w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-f1red/40 bg-[#120b0b]/92 backdrop-blur-lg shadow-[0_0_34px_rgba(225,6,0,0.35)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.24 }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'conic-gradient(from 0deg, rgba(225,6,0,0), rgba(225,6,0,0.45), rgba(225,6,0,0), rgba(225,6,0,0.35), rgba(225,6,0,0))' }}
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { duration: 7, repeat: Infinity, ease: 'linear' } : { duration: 0.2 }}
            />

            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(225,6,0,0.26) 0%, rgba(225,6,0,0.06) 48%, rgba(225,6,0,0) 72%)' }}
              animate={isPlaying ? { scale: [0.95, 1.08, 0.95], opacity: [0.4, 0.8, 0.4] } : { scale: 1, opacity: 0.3 }}
              transition={isPlaying ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
            />

            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col items-center justify-center text-center gap-3 sm:gap-4">
              <div className="w-4/5 h-7 flex items-end justify-center gap-[2px]" aria-hidden="true">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.span
                    key={`wave-${i}`}
                    className="w-[2px] rounded-full bg-gradient-to-t from-f1red to-f1white/80"
                    animate={isPlaying ? { height: ['4px', `${9 + ((i * 5) % 14)}px`, '3px', `${7 + ((i * 3) % 10)}px`, '4px'] } : { height: '3px', opacity: 0.5 }}
                    transition={isPlaying ? { duration: 0.9 + ((i % 4) * 0.12), repeat: Infinity, ease: 'easeInOut', delay: i * 0.03 } : { duration: 0.25 }}
                  />
                ))}
              </div>

              <div className="flex items-end gap-[4px] h-5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((bar) => (
                  <motion.span
                    key={bar}
                    className="w-[3px] bg-f1red rounded-full"
                    animate={isPlaying ? { height: ['4px', '16px', '6px', '14px', '4px'] } : { height: '4px' }}
                    transition={isPlaying ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: bar * 0.08 } : { duration: 0.2 }}
                  />
                ))}
              </div>

              <div className="min-w-0 w-full">
                <p className="font-mono text-[10px] tracking-[0.24em] text-f1red/75 uppercase">{content.music?.title || 'Music'}</p>
                <p className="text-f1white text-sm font-semibold truncate mt-1">{currentSong.title}</p>
                <p className="text-f1silver/70 text-xs truncate">{currentSong.artist || 'Unknown Artist'}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="w-9 h-9 rounded-full border border-f1red/40 text-f1silver hover:text-f1white hover:border-f1red transition-colors flex items-center justify-center"
                  onClick={handlePrevious}
                  aria-label="Previous song"
                >
                  <PreviousIcon />
                </button>

                <button
                  type="button"
                  className="w-11 h-11 rounded-full bg-f1red text-white hover:brightness-110 transition-all flex items-center justify-center shadow-[0_0_16px_rgba(225,6,0,0.45)]"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause song' : 'Play song'}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>

                <button
                  type="button"
                  className="w-9 h-9 rounded-full border border-f1red/40 text-f1silver hover:text-f1white hover:border-f1red transition-colors flex items-center justify-center"
                  onClick={handleNext}
                  aria-label="Next song"
                >
                  <NextIcon />
                </button>
              </div>

              <div className="w-4/5 h-[3px] bg-f1white/10 overflow-hidden rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-f1red to-[#ff7c4d]"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-f1red/50 bg-[#1a1010]/95 backdrop-blur-lg shadow-[0_0_18px_rgba(225,6,0,0.28)] text-f1white flex items-center justify-center"
        onClick={() => setIsOpen((prev) => !prev)}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Hide music controls' : 'Show music controls'}
      >
        {[0, 1, 2].map((ring) => (
          <motion.span
            key={`ring-${ring}`}
            className="absolute inset-0 rounded-full border border-f1red/45 pointer-events-none"
            animate={isPlaying ? { scale: [1, 1.55, 1.75], opacity: [0.6, 0.28, 0] } : { scale: 1, opacity: 0 }}
            transition={isPlaying ? { duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: ring * 0.45 } : { duration: 0.2 }}
          />
        ))}

        <motion.span
          className="absolute inset-0 rounded-full border border-f1red/35"
          animate={isPlaying ? { scale: [1, 1.12, 1], opacity: [0.7, 0.1, 0.7] } : { scale: 1, opacity: 0.4 }}
          transition={isPlaying ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.25 }}
        />
        <MusicPulseIcon active={isPlaying} />
      </motion.button>

      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      >
        <source src={currentSong.src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </motion.div>
  );
};

export default NanoMusicPlayer;
