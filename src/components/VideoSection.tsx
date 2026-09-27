import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { CtaButton } from './CtaButton';

export const VideoSection: React.FC = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div id="vsl-video-container" ref={videoContainerRef} className="w-full flex flex-col items-center">
      {/* Video Box */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        className="relative w-full max-w-[960px] mx-auto rounded-[12px] border border-[#262626] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/9] bg-[#141414]"
      >
        <wistia-player media-id="uvr8q880um" aspect="1.7777777777777777" copy-link-and-thumbnail="false"></wistia-player>
      </motion.div>

      {/* CTA Button below video */}
      <div className="w-full flex justify-center mt-[24px] md:mt-[32px]">
        <CtaButton id="vsl-cta-button" />
      </div>
    </div>
  );
};
