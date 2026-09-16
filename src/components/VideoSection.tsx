import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { CtaButton } from './CtaButton';

export const VideoSection: React.FC = () => {
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true);
  const [overlayMounted, setOverlayMounted] = useState<boolean>(true);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const fallbackVideoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setOverlayVisible(false);
    if (fallbackVideoRef.current) {
      fallbackVideoRef.current.play().catch(() => {});
    }

    const w = window as any;
    const wistiaEl = document.querySelector('wistia-player') as any;
    if (wistiaEl && typeof wistiaEl.play === 'function') {
      try {
        wistiaEl.play();
      } catch (err) {
        console.error('Error playing wistia-player:', err);
      }
    }

    const h1 = w.Wistia?.api?.('[MEDIA-ID]');
    if (h1 && typeof h1.play === 'function') {
      try {
        h1.play();
      } catch (err) {
        console.error('Error playing Wistia instance:', err);
      }
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
        className="relative w-full max-w-[960px] mx-auto rounded-[12px] border border-[#262626] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/9] bg-[#141414]"
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
            className={`absolute inset-0 z-20 flex items-center justify-center cursor-pointer select-none bg-[#0A0A0A]/[0.45] transition-opacity duration-300 ${
              overlayVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Play Button Wrapper with expanding ring pulse */}
            <div className="relative flex items-center justify-center group">
              {/* Soft expanding ring pulse */}
              <div className="absolute inset-0 rounded-full bg-[#E8D171]/[0.35] animate-ping" style={{ animationDuration: '2s' }} />

              {/* Main Button */}
              <div className="relative w-[68px] h-[68px] md:w-[88px] md:h-[88px] rounded-full bg-[#FFFFFF] text-[#0A0A0A] shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-[1.08]">
                {/* Play Triangle optically centered (slightly shifted right) */}
                <svg
                  className="w-[26px] h-[26px] md:w-[32px] md:h-[32px] ml-[4px] fill-[#0A0A0A] text-[#0A0A0A]"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* CTA Button below video */}
      <div className="w-full flex justify-center mt-[24px] md:mt-[32px]">
        <CtaButton id="vsl-cta-button" />
      </div>
    </div>
  );
};
