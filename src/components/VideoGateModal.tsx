import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useVideoGate } from '../context/VideoGateContext';

export const VideoGateModal: React.FC = () => {
  const { isModalOpen, closeModal, remaining, playVideo } = useVideoGate();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen, closeModal]);

  const handleWatchVideoClick = () => {
    closeModal();
    const videoElement = document.getElementById('vsl-video-container');
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    playVideo();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="absolute inset-0 bg-[#0E1412]/85 backdrop-blur-[8px]"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-[460px] bg-[#16201D] border border-[#1E2F2A] rounded-[12px] p-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.6)] flex flex-col items-center text-center z-10"
          >
            {/* Play Triangle Icon inside 56px Circle */}
            <div className="w-[56px] h-[56px] rounded-full bg-[#1E2F2A] flex items-center justify-center mb-[20px]">
              <svg
                className="w-[24px] h-[24px] ml-[3px] fill-[#C9AB8B] text-[#C9AB8B]"
                viewBox="0 0 24 24"
              >
                <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
              </svg>
            </div>

            {/* Headline */}
            <h3 className="text-[20px] font-bold text-[#F0ECE1] leading-snug">
              Please watch the video first.
            </h3>

            {/* Body */}
            <p className="text-[15px] font-normal text-[#A3B0A9] leading-[1.65] mt-[16px]">
              Watch the video and your application unlocks automatically.
            </p>

            {/* Live counter */}
            <div className="text-[14px] font-bold text-[#C9AB8B] mt-[20px]">
              {remaining} seconds left to unlock
            </div>

            {/* Accent button: Watch the Video */}
            <button
              type="button"
              onClick={handleWatchVideoClick}
              className="w-full mt-[28px] py-[16px] px-[32px] bg-[#F0ECE1] text-[#0E1412] font-semibold text-[16px] rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:bg-[#FFFFFF] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Watch the Video
            </button>

            {/* Close text link */}
            <button
              type="button"
              onClick={closeModal}
              className="text-[13px] text-[#6B7A74] hover:text-[#F0ECE1] mt-[16px] transition-colors cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
