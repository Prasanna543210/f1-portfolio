import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import content from '../content/siteContent.json';

const iconStyle = { width: 14, height: 14 };

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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${active ? 'text-f1red' : 'text-f1silver/70'}`} aria-hidden="true">
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
  const [isRevealed, setIsRevealed] = useState(false);
  const audioRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  const currentSong = songs[currentIndex];

  const revealForTouch = () => {
    setIsRevealed(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsRevealed(false);
    }, 2200);
  };

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
    handleNext();
  };

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  if (!currentSong) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 w-[min(92vw,340px)]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      onTouchStart={revealForTouch}
    >
      <div className="relative overflow-hidden border border-f1red/40 bg-[#120b0b]/90 backdrop-blur-lg shadow-[0_0_24px_rgba(225,6,0,0.25)]"
           style={{ clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)' }}>
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-f1red to-transparent"
          animate={isPlaying ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.45 }}
          transition={isPlaying ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
        />

        <motion.div
          className="absolute -inset-8 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(225, 6, 0, 0.18) 0%, rgba(225, 6, 0, 0) 60%)' }}
          animate={isPlaying ? { scale: [0.92, 1.08, 0.92], opacity: [0.3, 0.7, 0.3] } : { scale: 1, opacity: 0.2 }}
          transition={isPlaying ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 }}
        />

        <div className="px-4 pt-3 pb-3 relative z-10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 border border-f1red/35 bg-f1red/10 flex items-center justify-center text-f1red">
                <MusicPulseIcon active={isPlaying} />
              </div>
              <div className="flex items-end gap-[3px] h-4" aria-hidden="true">
                {[0, 1, 2, 3].map((bar) => (
                  <motion.span
                    key={bar}
                    className="w-[2px] bg-f1red/85 rounded-full"
                    animate={
                      isPlaying
                        ? { height: ['4px', '14px', '6px', '12px', '4px'] }
                        : { height: '4px' }
                    }
                    transition={
                      isPlaying
                        ? {
                            duration: 0.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: bar * 0.08,
                          }
                        : { duration: 0.25 }
                    }
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="w-8 h-8 border border-f1red/40 text-f1silver hover:text-f1white hover:border-f1red/90 hover:bg-f1red/10 transition-colors flex items-center justify-center"
                onClick={handlePrevious}
                aria-label="Previous song"
              >
                <PreviousIcon />
              </button>

              <button
                type="button"
                className="w-9 h-9 bg-f1red text-white hover:brightness-110 transition-all flex items-center justify-center shadow-[0_0_16px_rgba(225,6,0,0.45)]"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause song' : 'Play song'}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <button
                type="button"
                className="w-8 h-8 border border-f1red/40 text-f1silver hover:text-f1white hover:border-f1red/90 hover:bg-f1red/10 transition-colors flex items-center justify-center"
                onClick={handleNext}
                aria-label="Next song"
              >
                <NextIcon />
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isRevealed ? (
              <motion.div
                key="song-meta"
                className="min-w-0 mt-3"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <p className="font-mono text-[10px] tracking-[0.25em] text-f1red/80 uppercase">
                  {content.music?.title || 'Music'}
                </p>
                <p className="text-f1white text-sm font-semibold truncate mt-1">{currentSong.title}</p>
                <p className="text-f1silver/70 text-xs truncate">{currentSong.artist || 'Unknown Artist'}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-3 h-[3px] bg-f1white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-f1red to-[#ff7c4d]"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>

        <audio
          ref={audioRef}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        >
          <source src={currentSong.src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </motion.div>
  );
};

export default NanoMusicPlayer;
