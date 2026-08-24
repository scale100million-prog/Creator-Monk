import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { useVideoGate } from '../context/VideoGateContext';
import { CtaButton } from './CtaButton';

export const VideoSection: React.FC = () => {
  const { isUnlocked, remaining, hasPlayed, isPlaying, playVideo } = useVideoGate();
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true);
  const [overlayMounted, setOverlayMounted] = useState<boolean>(true);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const fallbackVideoRef = useRef<HTMLVideoElement>(null);

  // Once playback starts, trigger fade-out and remove from DOM after 300ms
  useEffect(() => {
    if (hasPlayed && overlayVisible) {
      setOverlayVisible(false);
      const timer = setTimeout(() => {
        setOverlayMounted(false);
      }, 320);
      return () => clearTimeout(timer);
    }
  }, [hasPlayed, overlayVisible]);

  const handlePlayClick = () => {
    setOverlayVisible(false);
    playVideo();
    if (fallbackVideoRef.current) {
      fallbackVideoRef.current.play().catch(() => {});
    }
    setTimeout(() => {
      setOverlayMounted(false);
    }, 320);
  };

  return (
    <div id="vsl-video-container" ref={videoContainerRef} className="w-full flex flex-col items-center">
      {/* Video Box */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        className="relative w-full max-w-[960px] mx-auto rounded-[12px] border border-[#1E2F2A] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/9] bg-[#16201D]"
      >
        {/* Wistia Player Web Component */}
        <wistia-player
          media-id="[MEDIA-ID]"
          aspect="1.7777777777777777"
          className="w-full h-full block"
        />

        {/* Fallback Interactive Video Layer for seamless preview/testing */}
        <video
          ref={fallbackVideoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          playsInline
          controls={!overlayMounted}
          onPlay={() => {
            if (overlayMounted) {
              setOverlayVisible(false);
              setTimeout(() => setOverlayMounted(false), 320);
            }
          }}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        />

        {/* Big Play Button Overlay */}
        {overlayMounted && (
          <div
            id="video-play-overlay"
            onClick={handlePlayClick}
            className={`absolute inset-0 z-20 flex items-center justify-center cursor-pointer select-none bg-[#0E1412]/[0.35] transition-opacity duration-300 ${
              overlayVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Play Button Wrapper with expanding ring pulse */}
            <div className="relative flex items-center justify-center group">
              {/* Soft expanding ring pulse */}
              <div className="absolute inset-0 rounded-full bg-[#C9AB8B]/[0.35] animate-ping" style={{ animationDuration: '2s' }} />

              {/* Main Button */}
              <div className="relative w-[68px] h-[68px] md:w-[88px] md:h-[88px] rounded-full bg-[#F0ECE1] text-[#0E1412] shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-[1.08]">
                {/* Play Triangle optically centered (slightly shifted right) */}
                <svg
                  className="w-[26px] h-[26px] md:w-[32px] md:h-[32px] ml-[4px] fill-[#0E1412] text-[#0E1412]"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Unlock Countdown Line */}
      <div className="w-full max-w-[960px] mx-auto flex items-center justify-center mt-[12px] md:mt-[16px] min-h-[28px]">
        <AnimatePresence mode="wait">
          {hasPlayed && (
            <motion.div
              key={isUnlocked ? 'unlocked' : 'locked'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              id="countdown-line"
              className="flex items-center justify-center text-center text-[#C9AB8B] font-bold text-[15px]"
            >
              {!isUnlocked ? (
                <div className="flex items-center gap-[10px]">
                  {/* 8px dot with soft pulse */}
                  <span
                    className={`w-[8px] h-[8px] rounded-full bg-[#C9AB8B] inline-block ${
                      isPlaying ? 'animate-pulse' : 'opacity-100'
                    }`}
                  />
                  <span>Application unlocks in {remaining} sec</span>
                </div>
              ) : (
                <div className="flex items-center gap-[8px]">
                  <Check className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-[#C9AB8B] stroke-[2.5]" />
                  <span>Your application is unlocked</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Button below countdown line */}
      <div className="w-full flex justify-center mt-[16px] md:mt-[24px]">
        <CtaButton id="vsl-cta-button" />
      </div>
    </div>
  );
};
