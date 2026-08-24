import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Check } from 'lucide-react';
import { useVideoGate } from '../context/VideoGateContext';
import { CtaButton } from './CtaButton';

export const StickyFooter: React.FC = () => {
  const { isUnlocked } = useVideoGate();

  return (
    <footer
      id="sticky-footer"
      className="fixed bottom-0 left-0 right-0 w-full h-[80px] z-40 bg-[#0E1412]/[0.97] backdrop-blur-[16px] border-t border-[#1E2F2A] shadow-[0_-4px_24px_rgba(0,0,0,0.4)] px-[20px] md:px-[40px] flex items-center justify-between"
    >
      {/* Left Side Status */}
      <div className="flex items-center gap-[14px]">
        {/* 44px Circle Icon */}
        <div className="w-[44px] h-[44px] rounded-full bg-[#1E2F2A] flex items-center justify-center flex-shrink-0">
          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              <motion.div
                key="zap"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="w-[20px] h-[20px] text-[#C9AB8B] fill-[#C9AB8B]" />
              </motion.div>
            ) : (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Check className="w-[20px] h-[20px] text-[#C9AB8B] stroke-[3]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text Lines (Hidden on Mobile) */}
        <div className="hidden md:flex flex-col text-left">
          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              <motion.div
                key="locked-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-[15px] font-bold text-[#F0ECE1] leading-snug">
                  Watch the video to unlock your application
                </div>
                <div className="text-[12px] text-[#6B7A74] leading-normal">
                  Unlocks as you watch
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-[15px] font-bold text-[#F0ECE1] leading-snug">
                  Your application is unlocked
                </div>
                <div className="text-[12px] text-[#6B7A74] leading-normal">
                  Apply now
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side CTA Button */}
      <div className="flex-1 md:flex-initial ml-[16px] md:ml-0 flex justify-end">
        <CtaButton id="sticky-footer-cta" isFooter className="w-full md:w-auto" />
      </div>
    </footer>
  );
};
